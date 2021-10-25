import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
import clip2Polygon from './clip2Polygon.js';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');

interface gdalParams {
    raster: string[],
    warpedtemp?: string,
};

interface WarpParams extends gdalParams {
    extend: number[]
};

interface CalcParams extends gdalParams {
    weights: number[],
    outputName?: string,
    polygon?: GeoJSON
};

export interface GeoJSON{
    type: string,
    geometry:  {
        type: string,
        coordinates: number[][]
    },
    properties?: {
        name: string
    }
}

export interface MceParams extends CalcParams, WarpParams {};

export function getSmallesPixel(raster: string[]): number {
    let minPix = config.sourcemetadata.maxPix;
    for (let i = 0; i < raster.length; i++) {
        const path = `${config.calc.prepared}${raster[i]}.tif`;
        const info = execSync(`gdalinfo ${path} -json`);
        const infoJson = JSON.parse(info.toString());
        if (infoJson.hasOwnProperty("geoTransform") && infoJson.geoTransform[1] < minPix) {
            minPix = infoJson.geoTransform[1];
        };
        if (minPix === config.sourcemetadata.minPix) {
            break;
        };
    };
    return minPix;
};

export function execGdalWarp(pixelSize: number, extend: string, raster: string, warpedtemp: string): void {

    const outPath = `${warpedtemp}${raster}.tif`;
    const inputPath = `${config.calc.prepared}${raster}.tif`;
    const cmnd = `gdalwarp -t_srs EPSG:3035 -dstnodata 0.0 -tr ${pixelSize} ${pixelSize} -r near -te ${extend} -te_srs 'EPSG:3857' -of GTiff ${inputPath} ${outPath}`;
    try {
       const stderr = execSync(cmnd, { stdio: ['ignore', 'ignore', 'pipe'] });
    } catch (err) {
        throw err;
    };
};

export function warpFactors({ raster, extend, warpedtemp }: WarpParams) {
    const res = getSmallesPixel(raster);
    const ext = extend.join(" ");
    const out = warpedtemp ? warpedtemp : config.calc.warped;
    for (let i = 0; i < raster.length; i++) {
        try {
            execGdalWarp(res, ext, raster[i], out);
        } catch (e) {
            throw e;
        }
    };
};

//Führt Muliplikation mit Gewichtung und Addition durch
//Bsp. Command: gdal.py -A ./layer1.tif -B ./layer2.tif --outfile=./result.tif --calc"((A*weights[0])+(B*weights[1]))";
export function execCalc({ raster, weights, warpedtemp, outputName, polygon}: CalcParams): void {


    const rasterPaths: string[] = [];
    for (let i = 0; i < raster.length; i++) {
        rasterPaths.push(`${warpedtemp}${raster[i]}.tif`);
    };

    let layer = "";
    let calcExpr = "(";
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < rasterPaths.length; i++) {
        if (i > 0) { calcExpr += ' + ' };
        layer += ` -${alphabet.charAt(i)} ${rasterPaths[i]}`;
        calcExpr += `(${alphabet.charAt(i)}*${weights[i]})`;
    };
    calcExpr += ')';

    let outputPath = `${config.calc.mce}${outputName}.tif`;
    if(polygon){
        outputPath = `${warpedtemp}${outputName}.tif`;
    }
    const cmnd = `gdal_calc.py ${layer} --outfile=${outputPath} --calc="${calcExpr}"`;

    try {
        execSync(cmnd, { stdio: ['ignore', process.stdout, 'ignore'] });
    } catch (err) {
        throw err;
    };
};

export function doMCE(params: MceParams): string {
    const outputName = nameGenerator();
    params.warpedtemp = makeOutDir();
    params.outputName = outputName;

    try {
        warpFactors(params);
        execCalc(params);
        if(params.polygon){
            clip2Polygon(params)
        };
    } catch (e) {
        throw e;
    };

    try {
        //cleanDir(params.warpedtemp);
    } catch (e) {
        throw e;
    } finally {
        return outputName;
    }
};

export function nameGenerator(): string {
    const timestamp = new Date().getTime() + Math.floor(Math.random() * 10);
    return 'MCE' + timestamp;
};

export function makeOutDir(): string {
    const timestamp = new Date().getTime() * Math.floor(Math.random() * 10);
    const dir = config.calc.warped + 'warped' + timestamp + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return dir;
    } else {
        return makeOutDir();
    };
};

export function cleanDir(dir: string): void {
    fs.rm(dir, { recursive: true }, (err) => {
        if (err) {
            throw new Error("Verzeichnis konnte nicht gelöscht werden");
        }
    });
};

export default doMCE;

const test: MceParams={
    "raster": ["Populationsdichte", "Hitzewellen"],
    "extend": [1204113.4863363097, 6516753.637062674, 1223309.2831282716, 6537250.843806634],
    "weights": [0.3, 0.6]
}

const outputName = nameGenerator();
test.warpedtemp = makeOutDir();
test.outputName = outputName;

/*
try{
    console.log("test")
    warpFactors(test);
    console.log("test2")
    execCalc(test);
} catch (e){
    console.log(e);
}*/
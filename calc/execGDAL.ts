import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');

interface WarpParams {
    raster: string[],
    extend: string,
    sourceSrs?: string,
};
interface CalcParams {
    raster: string[],
    weights: number[],
    outputName: string
};

interface MceParams extends CalcParams, WarpParams { };

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

export function execGdalWarp(pixelSize: number, extend: string, raster: string, sourceSrs?: string): string {
    const srs = sourceSrs ? sourceSrs : 'EPSG:3857';
    const outPath = `${config.calc.warped}${raster}.tif`;
    const inputPath = `${config.calc.prepared}${raster}.tif`;
    const cmnd = `gdalwarp -dstnodata 0.0 -tr ${pixelSize} ${pixelSize} -r near -te ${extend} -te_srs ${srs} -of GTiff ${inputPath} ${outPath}`

    try {
        const gdalWarp = execSync(cmnd);
        gdalWarp.
        return gdalWarp.toString();

    } catch (err) {
        return err.toString();
    }
};

export function warpFactors({ raster, extend }: WarpParams):string[] {
    const res = getSmallesPixel(raster);
    const logs: string[]= [];
    for (let i = 0; i < raster.length; i++) {
        const warp = execGdalWarp(res, extend, raster[i]);
        logs.push(warp);
    };
    return logs;
};


//Führt Muliplikation mit Gewichtung und Addition durch
//Bsp. Command: gdal.py -A ./layer1.tif -B ./layer2.tif --outfile=./result.tif --calc"((A*weights[0])+(B*weights[1]))";
export function execCalc({ raster, weights, outputName }: CalcParams) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (raster.length<2 || raster.length !== weights.length || raster.length > alphabet.length) return;

    const rasterPaths: string[] = [];
    for (let i = 0; i < raster.length; i++) {
        rasterPaths.push(`${config.calc.warped}${raster[i]}.tif`);
    };

    const outputPath = `${config.calc.mce}${outputName}.tif`
    let layerFlags = "";
    let calc = "";
    for (let i = 0; i < rasterPaths.length; i++) {
        if(i>0){ calc+=' + ' };
        layerFlags += ` -${alphabet.charAt(i)} ${rasterPaths[i]}`;
        calc += `(${alphabet.charAt(i)}*${weights[i]})`;
    };
    calc += ')';

    const cmnd = `gdal_calc.py ${layerFlags} --outfile=${outputPath} --calc="${calc}"`;
    try {
        const gdalCalcpy = execSync(cmnd);
        return gdalCalcpy;
    } catch (err) {
        throw err;
    };
};

export function doMCE(params: MceParams) {
    try {
        const warp = warpFactors({ raster: params.raster, extend: params.extend });
        console.log(warp);
    } catch (e) {
        console.log(e);
    };
    try {
        const calc = execCalc({ raster: params.raster, weights: params.weights, outputName: params.outputName });
        console.log(calc?.toString())
    } catch (e) {
        console.log(e);
    };

    cleanDir(config.calc.warped);
};

export function cleanDir(dir: string) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
                if (err) throw err
            });
            console.log("cleaned " + file)
        };
    });
};

//Testeingaben

const testExtend: string = [
    955442.7350882173,
    6965590.539027553,
    1007145.8757782301,
    7020798.977391465
].join(" ");

const testFactors: string[] = [
    'Bevjekm2Skaliert',
    'Ue65Skaliert',
    'HeatWaveSpellNorm'
];

const testName = 'test4';

const testWeights: number[] = [0.3, 0.4, 0.3];

/*console.log("TEST1:--------------------------------------------------------------------------------------------------------------");
console.log(getSmallesPixel(testFactors));
console.log("TEST2:--------------------------------------------------------------------------------------------------------------");
warpFactors({ raster: testFactors, extend: testExtend });
console.log("TEST3:--------------------------------------------------------------------------------------------------------------");
execCalc({ raster: testFactors, weights: testWeights, outputName: 'test1' });
*/
console.log("TEST4:--------------------------------------------------------------------------------------------------------------");
doMCE({ raster: testFactors, weights: testWeights, extend: testExtend, outputName: testName });

export default doMCE;

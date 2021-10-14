import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');

interface gdalParams {
    raster: string[],
    warpedtemp?: string,
};
interface WarpParams extends gdalParams {
    extend: string,
    sourceSrs?: string,
};
interface CalcParams extends gdalParams {
    weights: number[],
    outputName?: string
};
export interface MceParams extends CalcParams, WarpParams { };

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

export function execGdalWarp(pixelSize: number, extend: string, raster: string,sourceSrs?: string, ) {
    const srs = sourceSrs ? sourceSrs : 'EPSG:3857';
    const outPath = `${config.calc.warped}${raster}.tif`;
    const inputPath = `${config.calc.prepared}${raster}.tif`;
    const cmnd = `gdalwarp -dstnodata 0.0 -tr ${pixelSize} ${pixelSize} -r near -te ${extend} -te_srs ${srs} -of GTiff ${inputPath} ${outPath}`
    console.log(cmnd);
    try {
        const gdalWarp = execSync(cmnd);
        return gdalWarp;
    } catch (err) {

        throw err;
    };
};

export function warpFactors({ raster, extend}: WarpParams): string[] {
    const res = getSmallesPixel(raster);
    const logs: string[] = [];
    console.log(raster.length)
    for (let i = 0; i < raster.length; i++) {
        const warp = execGdalWarp(res, extend, raster[i]);
        logs.push(warp.toString());
    };
    return logs;
};


//Führt Muliplikation mit Gewichtung und Addition durch
//Bsp. Command: gdal.py -A ./layer1.tif -B ./layer2.tif --outfile=./result.tif --calc"((A*weights[0])+(B*weights[1]))";
export function execCalc({ raster, weights, warpedtemp, outputName }: CalcParams) {    
    
    const rasterPaths: string[] = [];
    for (let i = 0; i < raster.length; i++) {
        rasterPaths.push(`${warpedtemp}${raster[i]}.tif`);
    };
    
    let layerFlags = "";
    let calc = "";
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < rasterPaths.length; i++) {
        if (i > 0) { calc += ' + ' };
        layerFlags += ` -${alphabet.charAt(i)} ${rasterPaths[i]}`;
        calc += `(${alphabet.charAt(i)}*${weights[i]})`;
    };
    calc += ')';    

    const outputPath = `${config.calc.mce}${outputName}.tif`
    const cmnd = `gdal_calc.py ${layerFlags} --outfile=${outputPath} --calc="${calc}"`;
    try {
        const gdalCalcpy = execSync(cmnd);
        return gdalCalcpy;
    } catch (err) {
        throw err;
    };
};

export function doMCE(params: MceParams):string {
    const tempDir = makeOutDir();
    const outputName = nameGenerator();
    try {
        params.warpedtemp = tempDir
        warpFactors(params);
    } catch (e) {
        throw e;
    };
    try {
        params.outputName = outputName;
        execCalc(params);
    } catch (e) {
        throw e;
    };
    cleanDir(tempDir);
    return outputName;
};

export function makeOutDir(outDir?: string): string {
    const timestamp = new Date().getTime() * Math.floor(Math.random() * 10);
    const dir = config.calc.warped + timestamp + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return dir;
    } else {
        return makeOutDir(dir);
    };
}

export function cleanDir(dir: string) {
    fs.rm(dir, { recursive: true }, (err) => {
        if (err) {
            console.log(dir + 'konnte nicht entfernt werden');
        } console.log('cleaned');
    });
};

export function nameGenerator(): string {
    const timestamp = new Date().getTime() * Math.floor(Math.random() * 10);
    return 'MCE' + timestamp;    
}

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

const test ={
    raster: ['Bevjekm2Skaliert','Ue65Skaliert','HeatWaveSpellNorm'],
    extend: [955442.7350882173,6965590.539027553,1007145.8757782301, 7020798.977391465],
    weights: [0.3, 0.4, 0.3]
}

const testWeights: number[] = [0.3, 0.4, 0.3];

//console.log("TEST1:--------------------------------------------------------------------------------------------------------------");
//console.log(getSmallesPixel(testFactors));
console.log("TEST2:--------------------------------------------------------------------------------------------------------------");
//warpFactors({raster: testFactors, extend: testExtend});
//console.log("TEST3:--------------------------------------------------------------------------------------------------------------");
//execCalc({ raster: testFactors, weights: testWeights, outputName: 'test1' });
//console.log("TEST4:--------------------------------------------------------------------------------------------------------------");
//doMCE({ raster: testFactors, weights: testWeights, extend: testExtend, outputName: testName });

export default doMCE;

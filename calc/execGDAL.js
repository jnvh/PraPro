import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var config = require('./configs/config.json');
;
;
;
;
export function getSmallesPixel(raster) {
    var minPix = config.sourcemetadata.maxPix;
    for (var i = 0; i < raster.length; i++) {
        var path = "" + config.calc.prepared + raster[i] + ".tif";
        var info = execSync("gdalinfo " + path + " -json");
        var infoJson = JSON.parse(info.toString());
        if (infoJson.hasOwnProperty("geoTransform") && infoJson.geoTransform[1] < minPix) {
            minPix = infoJson.geoTransform[1];
        }
        ;
        if (minPix === config.sourcemetadata.minPix) {
            break;
        }
        ;
    }
    ;
    return minPix;
}
;
export function execGdalWarp(pixelSize, extend, raster, sourceSrs) {
    var srs = sourceSrs ? sourceSrs : 'EPSG:3857';
    var outPath = "" + config.calc.warped + raster + ".tif";
    var inputPath = "" + config.calc.prepared + raster + ".tif";
    var cmnd = "gdalwarp -dstnodata 0.0 -tr " + pixelSize + " " + pixelSize + " -r near -te " + extend + " -te_srs " + srs + " -of GTiff " + inputPath + " " + outPath;
    console.log(cmnd);
    try {
        var gdalWarp = execSync(cmnd);
        return gdalWarp;
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export function warpFactors(_a) {
    var raster = _a.raster, extend = _a.extend;
    var res = getSmallesPixel(raster);
    var logs = [];
    console.log(raster.length);
    for (var i = 0; i < raster.length; i++) {
        var warp = execGdalWarp(res, extend, raster[i]);
        logs.push(warp.toString());
    }
    ;
    return logs;
}
;
//Führt Muliplikation mit Gewichtung und Addition durch
//Bsp. Command: gdal.py -A ./layer1.tif -B ./layer2.tif --outfile=./result.tif --calc"((A*weights[0])+(B*weights[1]))";
export function execCalc(_a) {
    var raster = _a.raster, weights = _a.weights, warpedtemp = _a.warpedtemp, outputName = _a.outputName;
    var rasterPaths = [];
    for (var i = 0; i < raster.length; i++) {
        rasterPaths.push("" + warpedtemp + raster[i] + ".tif");
    }
    ;
    var layerFlags = "";
    var calc = "";
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < rasterPaths.length; i++) {
        if (i > 0) {
            calc += ' + ';
        }
        ;
        layerFlags += " -" + alphabet.charAt(i) + " " + rasterPaths[i];
        calc += "(" + alphabet.charAt(i) + "*" + weights[i] + ")";
    }
    ;
    calc += ')';
    var outputPath = "" + config.calc.mce + outputName + ".tif";
    var cmnd = "gdal_calc.py " + layerFlags + " --outfile=" + outputPath + " --calc=\"" + calc + "\"";
    try {
        var gdalCalcpy = execSync(cmnd);
        return gdalCalcpy;
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export function doMCE(params) {
    var tempDir = makeOutDir();
    var outputName = nameGenerator();
    try {
        params.warpedtemp = tempDir;
        warpFactors(params);
    }
    catch (e) {
        throw e;
    }
    ;
    try {
        params.outputName = outputName;
        execCalc(params);
    }
    catch (e) {
        throw e;
    }
    ;
    cleanDir(tempDir);
    return outputName;
}
;
export function makeOutDir(outDir) {
    var timestamp = new Date().getTime() * Math.floor(Math.random() * 10);
    var dir = config.calc.warped + timestamp + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return dir;
    }
    else {
        return makeOutDir(dir);
    }
    ;
}
export function cleanDir(dir) {
    fs.rm(dir, { recursive: true }, function (err) {
        if (err) {
            console.log(dir + 'konnte nicht entfernt werden');
        }
        console.log('cleaned');
    });
}
;
export function nameGenerator() {
    var timestamp = new Date().getTime() * Math.floor(Math.random() * 10);
    return 'MCE' + timestamp;
}
//Testeingaben
var testExtend = [
    955442.7350882173,
    6965590.539027553,
    1007145.8757782301,
    7020798.977391465
].join(" ");
var testFactors = [
    'Bevjekm2Skaliert',
    'Ue65Skaliert',
    'HeatWaveSpellNorm'
];
var test = {
    raster: ['Bevjekm2Skaliert', 'Ue65Skaliert', 'HeatWaveSpellNorm'],
    extend: [955442.7350882173, 6965590.539027553, 1007145.8757782301, 7020798.977391465],
    weights: [0.3, 0.4, 0.3]
};
var testWeights = [0.3, 0.4, 0.3];
//console.log("TEST1:--------------------------------------------------------------------------------------------------------------");
//console.log(getSmallesPixel(testFactors));
console.log("TEST2:--------------------------------------------------------------------------------------------------------------");
//warpFactors({raster: testFactors, extend: testExtend});
//console.log("TEST3:--------------------------------------------------------------------------------------------------------------");
//execCalc({ raster: testFactors, weights: testWeights, outputName: 'test1' });
//console.log("TEST4:--------------------------------------------------------------------------------------------------------------");
//doMCE({ raster: testFactors, weights: testWeights, extend: testExtend, outputName: testName });
export default doMCE;

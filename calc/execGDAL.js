import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
var require = createRequire(import.meta.url);
var config = require('./configs/config.json');
;
;
;
export function getSmallesPixel(raster) {
    var minPix = config.sourcemetadata.maxPix;
    for (var i = 0; i < raster.length; i++) {
        var path_1 = "" + config.calc.prepared + raster[i] + ".tif";
        var info = execSync("gdalinfo " + path_1 + " -json");
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
    try {
        var gdalWarp = execSync(cmnd);
        gdalWarp.
        ;
        return gdalWarp.toString();
    }
    catch (err) {
        return err.toString();
    }
}
;
export function warpFactors(_a) {
    var raster = _a.raster, extend = _a.extend;
    var res = getSmallesPixel(raster);
    var logs = [];
    for (var i = 0; i < raster.length; i++) {
        var warp = execGdalWarp(res, extend, raster[i]);
        logs.push(warp);
    }
    ;
    return logs;
}
;
//Führt Muliplikation mit Gewichtung und Addition durch
//Bsp. Command: gdal.py -A ./layer1.tif -B ./layer2.tif --outfile=./result.tif --calc"((A*weights[0])+(B*weights[1]))";
export function execCalc(_a) {
    var raster = _a.raster, weights = _a.weights, outputName = _a.outputName;
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (raster.length < 2 || raster.length !== weights.length || raster.length > alphabet.length)
        return;
    var rasterPaths = [];
    for (var i = 0; i < raster.length; i++) {
        rasterPaths.push("" + config.calc.warped + raster[i] + ".tif");
    }
    ;
    var outputPath = "" + config.calc.mce + outputName + ".tif";
    var layerFlags = "";
    var calc = "";
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
    try {
        var warp = warpFactors({ raster: params.raster, extend: params.extend });
        console.log(warp);
    }
    catch (e) {
        console.log(e);
    }
    ;
    try {
        var calc = execCalc({ raster: params.raster, weights: params.weights, outputName: params.outputName });
        console.log(calc === null || calc === void 0 ? void 0 : calc.toString());
    }
    catch (e) {
        console.log(e);
    }
    ;
    cleanDir(config.calc.warped);
}
;
export function cleanDir(dir) {
    fs.readdir(dir, function (err, files) {
        if (err)
            throw err;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            fs.unlink(path.join(dir, file), function (err) {
                if (err)
                    throw err;
            });
            console.log("cleaned " + file);
        }
        ;
    });
}
;
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
var testName = 'test4';
var testWeights = [0.3, 0.4, 0.3];
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

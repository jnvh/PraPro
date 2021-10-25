import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
import clip2Polygon from './clip2Polygon.js';
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
export function execGdalWarp(pixelSize, extend, raster, warpedtemp) {
    var outPath = "" + warpedtemp + raster + ".tif";
    var inputPath = "" + config.calc.prepared + raster + ".tif";
    var cmnd = "gdalwarp -t_srs EPSG:3035 -dstnodata 0.0 -tr " + pixelSize + " " + pixelSize + " -r near -te " + extend + " -te_srs 'EPSG:3857' -of GTiff " + inputPath + " " + outPath;
    try {
        var stderr = execSync(cmnd, { stdio: ['ignore', 'ignore', 'pipe'] });
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export function warpFactors(_a) {
    var raster = _a.raster, extend = _a.extend, warpedtemp = _a.warpedtemp;
    var res = getSmallesPixel(raster);
    var ext = extend.join(" ");
    var out = warpedtemp ? warpedtemp : config.calc.warped;
    for (var i = 0; i < raster.length; i++) {
        try {
            execGdalWarp(res, ext, raster[i], out);
        }
        catch (e) {
            throw e;
        }
    }
    ;
}
;
//Führt Muliplikation mit Gewichtung und Addition durch
//Bsp. Command: gdal.py -A ./layer1.tif -B ./layer2.tif --outfile=./result.tif --calc"((A*weights[0])+(B*weights[1]))";
export function execCalc(_a) {
    var raster = _a.raster, weights = _a.weights, warpedtemp = _a.warpedtemp, outputName = _a.outputName, polygon = _a.polygon;
    var rasterPaths = [];
    for (var i = 0; i < raster.length; i++) {
        rasterPaths.push("" + warpedtemp + raster[i] + ".tif");
    }
    ;
    var layer = "";
    var calcExpr = "(";
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < rasterPaths.length; i++) {
        if (i > 0) {
            calcExpr += ' + ';
        }
        ;
        layer += " -" + alphabet.charAt(i) + " " + rasterPaths[i];
        calcExpr += "(" + alphabet.charAt(i) + "*" + weights[i] + ")";
    }
    ;
    calcExpr += ')';
    var outputPath = "" + config.calc.mce + outputName + ".tif";
    if (polygon) {
        outputPath = "" + warpedtemp + outputName + ".tif";
    }
    var cmnd = "gdal_calc.py " + layer + " --outfile=" + outputPath + " --calc=\"" + calcExpr + "\"";
    try {
        execSync(cmnd, { stdio: ['ignore', process.stdout, 'ignore'] });
    }
    catch (err) {
        throw err;
    }
    ;
}
;
export function doMCE(params) {
    var outputName = nameGenerator();
    params.warpedtemp = makeOutDir();
    params.outputName = outputName;
    try {
        warpFactors(params);
        execCalc(params);
        if (params.polygon) {
            clip2Polygon(params);
        }
        ;
    }
    catch (e) {
        throw e;
    }
    ;
    try {
        //cleanDir(params.warpedtemp);
    }
    catch (e) {
        throw e;
    }
    finally {
        return outputName;
    }
}
;
export function nameGenerator() {
    var timestamp = new Date().getTime() + Math.floor(Math.random() * 10);
    return 'MCE' + timestamp;
}
;
export function makeOutDir() {
    var timestamp = new Date().getTime() * Math.floor(Math.random() * 10);
    var dir = config.calc.warped + 'warped' + timestamp + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return dir;
    }
    else {
        return makeOutDir();
    }
    ;
}
;
export function cleanDir(dir) {
    fs.rm(dir, { recursive: true }, function (err) {
        if (err) {
            throw new Error("Verzeichnis konnte nicht gelöscht werden");
        }
    });
}
;
export default doMCE;
var test = {
    "raster": ["Populationsdichte", "Hitzewellen"],
    "extend": [1204113.4863363097, 6516753.637062674, 1223309.2831282716, 6537250.843806634],
    "weights": [0.3, 0.6]
};
var outputName = nameGenerator();
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

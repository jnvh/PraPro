import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var config = require('./configs/config.json');
export function writeJSON(input, dir) {
    var data = JSON.stringify(input);
    var destination = dir + "crop.json";
    fs.writeFile(destination, data, function (err) {
        if (err) {
            throw err;
        }
    });
}
//ogr2ogr -nlt POLYGON -skipfailures -a_srs 'EPSG:3035' polys.shp test.json
export function geoJsontoShp(warpedtemp) {
    var inputPath = warpedtemp + "crop.json";
    var outputPath = warpedtemp + "crop.shp";
    var cmnd = "ogr2ogr -nlt POLYGON -skipfailures -a_srs 'EPSG:3035' " + outputPath + " " + inputPath;
    try {
        execSync(cmnd);
    }
    catch (err) {
        throw err;
    }
    ;
}
;
//gdalwarp -cutline test.shp -crop_to_cutline -t_srs 'EPSG:3035' -of GTIFF target.tif out.tif
export function clip2Polygon(_a) {
    var warpedtemp = _a.warpedtemp, outputName = _a.outputName, polygon = _a.polygon;
    cropping: try {
        if (polygon && warpedtemp) {
            writeJSON(polygon, warpedtemp);
            geoJsontoShp(warpedtemp);
        }
        else {
            break cropping;
        }
        ;
        var input = warpedtemp + "crop.shp";
        var output = "" + config.calc.mce + outputName + ".tif";
        var target = "" + warpedtemp + outputName + ".tif";
        var cmnd = "gdalwarp -cutline " + input + " -crop_to_cutline -t_srs 'EPSG:3035' -of GTIFF " + target + " " + output;
        execSync(cmnd);
    }
    catch (e) {
        throw e;
    }
}
;
export default clip2Polygon;

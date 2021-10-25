import { execSync } from 'child_process';
import * as fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');
import { MceParams, GeoJSON } from './execGDAL';

export function writeJSON(input: GeoJSON, dir: string) {
    const data = JSON.stringify(input);
    const destination =`${dir}crop.json`;
    fs.writeFile(destination, data, (err)=>{
        if(err) {
            throw err;
        }
    })
}


//ogr2ogr -nlt POLYGON -skipfailures -a_srs 'EPSG:3035' polys.shp test.json
export function geoJsontoShp (warpedtemp: string) {
    const inputPath = `${warpedtemp}crop.json`;
    const outputPath = `${warpedtemp}crop.shp`;
    const cmnd = `ogr2ogr -nlt POLYGON -skipfailures -a_srs 'EPSG:3035' ${outputPath} ${inputPath}`;
    try {
        execSync(cmnd);
    } catch (err) {
        throw err;
    };    
};

//gdalwarp -cutline test.shp -crop_to_cutline -t_srs 'EPSG:3035' -of GTIFF target.tif out.tif
export function  clip2Polygon({warpedtemp, outputName, polygon}: MceParams) {
    cropping: try{
        if(polygon && warpedtemp){
            writeJSON(polygon, warpedtemp);
            geoJsontoShp(warpedtemp);
        } else {
            break cropping;
        };
        const input = `${warpedtemp}crop.shp`;
        const output = `${config.calc.mce}${outputName}.tif`
        const target = `${warpedtemp}${outputName}.tif`
        const cmnd = `gdalwarp -cutline ${input} -crop_to_cutline -t_srs 'EPSG:3035' -of GTIFF ${target} ${output}`;
        execSync(cmnd);
    } catch (e) {
        throw e;
    }    
};

export default clip2Polygon;
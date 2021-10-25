import { execSync } from 'child_process';
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var config = require('./configs/config.json');
;
export function getStats(rasterName) {
    var path = "" + config.calc.mce + rasterName + ".tif";
    var ifnoExec = execSync("gdalinfo " + path + " -hist -json");
    var infoData = JSON.parse(ifnoExec.toString());
    if (infoData.hasOwnProperty('bands') && Array.isArray(infoData.bands)) {
        var stats = infoData.bands.pop();
        var min = stats.hasOwnProperty('min') ? infoData.min : undefined;
        var max = stats.hasOwnProperty('max') ? infoData.max : undefined;
        var mean = stats.hasOwnProperty('mean') ? infoData.mean : undefined;
        var hist = stats.hasOwnProperty('histogram') ? infoData.histogram : undefined;
        if (min && max && mean && hist) {
            return ({
                min: min,
                max: max,
                mean: mean,
                histData: computeHist(hist)
            });
        }
        ;
    }
    ;
    return undefined;
}
;
export function computeHist(hist) {
    return hist.buckets;
}
export default getStats;

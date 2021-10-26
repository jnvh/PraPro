import { execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');

export interface RasterStats {
    min: number,
    max: number,
    mean: number,
    histData?: number[]
};

interface Hist extends RasterStats {
    count: number,
    buckets: number[]
}

export function getStats(rasterName: string): RasterStats | undefined {
    const path = `${config.calc.mce}${rasterName}.tif`;
    const ifnoExec = execSync(`gdalinfo ${path} -hist -json`);
    const infoData = JSON.parse(ifnoExec.toString());
    if (infoData.hasOwnProperty('bands') && Array.isArray(infoData.bands)) {
        const stats = infoData.bands.pop();
        const min = stats.hasOwnProperty('min') ? infoData.min : undefined;
        const max = stats.hasOwnProperty('max') ? infoData.max : undefined;
        const mean = stats.hasOwnProperty('mean') ? infoData.mean : undefined;
        const hist: Hist = stats.hasOwnProperty('histogram') ? infoData.histogram : undefined;
        if (min && max && mean && hist) {
            return ({
                min: min,
                max: max,
                mean: mean,
                histData: computeHist(hist)
            });
        };
    };
    return undefined;
};

export function computeHist(hist: Hist) {
    return hist.buckets;
}

export default getStats;
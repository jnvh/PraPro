export interface RasterStats {
    min: number,
    max: number,
    mean: number,
    histData?: Hist
};

export interface Hist extends RasterStats {
    count: number,
    buckets: number[],
}

export async function getRasterStats(raster: string) {
    const response = await fetch('stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({raster: raster})           
    });
    const res = await response.json();

    const json = res.hasOwnProperty("stats")?  res.stats :undefined;

    if(json){
    const out = {
        min: json.hasOwnProperty("min")?  json.min :undefined,
        max: json.hasOwnProperty("max")?  json.max :undefined,
        mean: json.hasOwnProperty("mean")?  json.mean :undefined,
        histData: json.hasOwnProperty("histData") ?  json.histData :undefined
    };
    
    console.log(json)
    if(out.min && out.max && out.mean){
        console.log(out.histData);        
        return out;
    }
 }
        return undefined;
     

};



export default getRasterStats;
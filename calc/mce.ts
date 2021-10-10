import { GeoTIFF, RasterData, writeArrayBuffer } from 'geotiff';
import { getGeoTIFF } from './wcsConnect/wcsConnect';
import { buffertoGeoTiff } from './writeGeotiff';

interface mceInput{
    factors: string[],
    weights: number[],
    //extned: number[],
};

export const mceAnalysis = (mceInput: mceInput): Promise<string> => {
    const factors = mceInput.factors;
    const weights = mceInput.weights;
    const n = factors.length;
    const factorTiffs: GeoTIFF[] = [];
    const weighted: RasterData[] = [];
    //const extend = mceInput.extend;

    return new Promise ((resolve, reject)=>{

    //Lade alle Fakotren über WCS in das Array factorTiff
        for(let i = 0; i<n;i++){

            const tif = getGeoTIFF(factors[i]);
            if(tif){
                factorTiffs.push(tif);
            } else {
                reject({
                    errors: [{
                        message: [`Layer ${factors[i]} ist nicht vorhanden.`]
                    }]
                })
            };           
        };

    //Resamplen??

    //Clip to extend
    
    //Gewichte alle Faktoren und lade das ergebniss in weigted
        for(let i =0; i<n; i++){
            const data = doMCE(factorTiffs[i], weights[i]);
            if(data){
                weighted.push(data);
            } else {
                reject({
                    errors: [{
                        message: [`Error bei der gewichtung von Layer ${factors[i]}.`]
                    }]
                })
            };
        };
    //Addire alle datan aus Weighted
        const result = combine(weighted); 

    //Result speichern
        try{
            writeArrayBuffer(result).then(
                (resultTiff) => {buffertoGeoTiff(resultTiff)}
            ).catch((err)=> new Error(err));
        } catch (err) {
            reject({
                errors: [{
                    message: [`Error beim Speichern des Ergebnisses.`]
                }]
            })
        };   

    //Result zippen

    //Send result to Rest 

    //Style result in rest

    //Result als WMS Publishen??
    const wms = "wms";
    resolve(wms);     
        
    });
}

export function cliptoextend(tif: GeoTIFF, extend: number){

};

export function doMCE(tif: GeoTIFF, weight: number): RasterData | null {    
    let outputdata: RasterData | null;
    tif.getImage()
        .then((image) => image.readRasters())
        .then((data)=>{
            outputdata = data.map((element: number) => {
                if (typeof element === 'number') {
                    return element * weight;
                } else {
                    return 0;
                }
            });
        });
    return outputdata;      
};

export function combine(factors: RasterData[]) {
    const result = factors[0];
    return (
        result.forEach((value: number, index:number) => {
            for (let i = 1; i < factors.length; i++) {
                const raster = factors[i];
                value = + raster[index];
            }
        })
    );
};

/*port default class mceAnalysis{

    weights: number[];
    factorNames: string[];
    layers: any;
    constructor(weights: number[], facors: string[]){
        this.weights = weights;
        this.factorNames = facors;
    };

    getWeights(){
        return this.weights;
    };
    getfactorNames(){
        return this.factorNames;
    };
    getLayers(){
        return this.layers;
    };
    setLayers(input: any){
        this.layers = input;
    }
}
*/
/*

export const startMCE = ()=>{
    const mce = {
        weights,
        names,
        layers,
        result
    };

    return mce;
}*/
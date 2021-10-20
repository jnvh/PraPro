import doMCE, { MceParams } from "./execGDAL.js";
import {postCoveragestore, postCoverage} from "./connect_rest.js";
import config from './configs/config.json';

export function mceHandler(input: MceParams): string {
    const params: MceParams = {
        raster: [],
        extend: [],
        weights: [],
    };
 
    try {
        const resolved = resolveParams(input);
        params.raster = resolved.raster;
        params.extend = resolved.extend;
        params.weights = resolved.weights;
        const output: string = doMCE(params);
        postCoveragestore(output);
        postCoverage(output);
        //updateStyle(output)
        console.log("MCEHandler: " + output);
        return output;
    } catch (e) {
        throw e;
    }
}

export function resolveParams(input: MceParams): MceParams {
    if (input.hasOwnProperty("raster") && input.hasOwnProperty("extend") && input.hasOwnProperty("weights")) {

        const raster = input.raster;
        const extend = input.extend;
        const weights = input.weights;

        for(let i = 0; i<raster.length;i++){
            let check = false;
            for(let j = 0; i< config.rasterInputs.length;i++){
                check = (raster[i]===config.rasterInputs[i]);
            }
            if(!check){
                throw new Error("Ungültig");
            };
        }

        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
        };
        if (raster.length < 2 || raster.length > 26 || raster.length !== weights.length || sum > 1) {
            throw new Error("Ungültig");
        } else {
            return {
                raster: raster,
                extend: extend,
                weights: weights,
            }
        }
    } else {
        throw new Error("Ungültig");
    };
};


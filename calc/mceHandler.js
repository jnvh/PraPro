import doMCE from "./execGDAL.js";
import { postCoveragestore, postCoverage } from "./connect_rest.js";
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var config = require('./configs/config.json');
export function mceHandler(input) {
    var params = {
        raster: [],
        extend: [],
        weights: [],
    };
    try {
        var resolved = resolveParams(input);
        console.log("test1");
        params.raster = resolved.raster;
        params.extend = resolved.extend;
        params.weights = resolved.weights;
        console.log(params);
        var output = doMCE(params);
        console.log("test1");
        console.log(output);
        postCoveragestore(output);
        postCoverage(output);
        //updateStyle(output)
        console.log("MCEHandler: " + output);
        return output;
    }
    catch (e) {
        throw e;
    }
}
export function resolveParams(input) {
    if (input.hasOwnProperty("raster") && input.hasOwnProperty("extend") && input.hasOwnProperty("weights")) {
        var raster = input.raster;
        var extend = input.extend;
        var weights = input.weights;
        console.log(typeof (extend[0]));
        console.log(raster.length);
        for (var i = 0; i < raster.length; i++) {
            var check = false;
            for (var j = 0; j < config.rasterInputs.length; i++) {
                if (raster[i] === config.rasterInputs[i]) {
                    check = true;
                    console.log(check);
                    break;
                }
            }
            console.log(check);
            if (!check) {
                throw new Error("Ungültiger check");
            }
            ;
        }
        var sum = 0;
        for (var i = 0; i < weights.length; i++) {
            sum += weights[i];
        }
        ;
        if (raster.length < 2 || raster.length > 26 || raster.length !== weights.length || sum > 1) {
            throw new Error("Ungültig ");
        }
        else {
            return {
                raster: raster,
                extend: extend,
                weights: weights,
            };
        }
    }
    else {
        throw new Error("Ungültig");
    }
    ;
}
;
export default mceHandler;
var test = {
    "raster": ["Populationsdichte", "Hitzewellen"],
    "extend": [1204113.4863363097, 6516753.637062674, 1223309.2831282716, 6537250.843806634],
    "weights": [0.3, 0.6]
};
try {
    console.log("test");
    var c = mceHandler(test);
    console.log(c);
}
catch (e) {
    console.log(e);
}

import doMCE from "./execGDAL.js";
export function mceHandler(input) {
    var params = {
        raster: [],
        extend: "",
        weights: [],
    };
    try {
        var resolved = resolveParams(input);
        params.raster = resolved.raster;
        params.extend = resolved.extend;
        params.weights = resolved.weights;
    }
    catch (e) {
        throw e;
    }
    try {
        var output = doMCE(params);
        /*try{
            const rest = connect_rest(output);
            return output;
        } catch (e){
            throw e;
        }*/
        //Zeile später löschen
        return output;
    }
    catch (e) {
        throw e;
    }
    ;
}
export function resolveParams(input) {
    if (input.hasOwnProperty("raster") && input.hasOwnProperty("extend") && input.hasOwnProperty("weights")) {
        var raster = input.raster;
        var extend = input.extend;
        var weights = input.weights;
        var sum = 0;
        for (var i = 0; i < weights.length; i++) {
            sum += weights[i];
        }
        ;
        if (raster.length < 2 || raster.length > 26 || raster.length !== weights.length || sum > 1) {
            throw new Error("Ungültig");
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

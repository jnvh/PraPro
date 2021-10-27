var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import doMCE from "./execGDAL.js";
import { postCoveragestore, postCoverage } from "./connect_rest.js";
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var config = require('./configs/config.json');
export function mceHandler(input) {
    return __awaiter(this, void 0, void 0, function () {
        var params, resolved, output, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        raster: [],
                        extend: [],
                        weights: [],
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    resolved = resolveParams(input);
                    params.raster = resolved.raster;
                    params.extend = resolved.extend;
                    params.weights = resolved.weights;
                    output = doMCE(params);
                    return [4 /*yield*/, postCoveragestore(output)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, postCoverage(output)];
                case 3:
                    _a.sent();
                    //updateStyle(output);
                    return [2 /*return*/, output];
                case 4:
                    e_1 = _a.sent();
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function resolveParams(input) {
    if (input.hasOwnProperty("raster") && input.hasOwnProperty("extend") && input.hasOwnProperty("weights")) {
        var raster = input.raster;
        var extend = input.extend;
        var weights = input.weights;
        var polygon = void 0;
        for (var i = 0; i < raster.length; i++) {
            var check = false;
            for (var j = 0; j < config.rasterInputs.length; i++) {
                if (raster[i] === config.rasterInputs[i]) {
                    check = true;
                    console.log(check);
                    break;
                }
            }
            if (!check) {
                throw new Error("Ungültiger check");
            }
            ;
        }
        ;
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
/*
try{
    console.log("test");
    const c = mceHandler(test);
    console.log(c);
} catch (e){
    console.log(e);
}*/ 

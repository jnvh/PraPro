import doMCE from "./execGDAL";
;
;
;
var mceHandler = /** @class */ (function () {
    function mceHandler(input) {
        this.status = 0;
        this.response = 'MCE is pending';
        this.params = {
            raster: [],
            weights: [],
            extend: "",
            outputName: "test",
        };
        this.resolveParams(input);
    }
    mceHandler.prototype.resolveParams = function (params) {
        var json = JSON.parse(params);
        if (json.hasOwnProperty("raster") && json.hasOwnProperty("extend") && json.hasOwnProperty("weights")) {
            this.params.raster = json.raster;
            this.params.extend = json.extend;
            this.params.weights = json.weights;
        }
        else {
            this.status = 500;
        }
    };
    ;
    mceHandler.prototype.getStatus = function () {
        return this.status;
    };
    ;
    mceHandler.prototype.setStatus = function (status) {
        this.status = status;
    };
    ;
    mceHandler.prototype.startMCE = function () {
        if (this.status !== 0) {
            return this.status;
        }
        doMCE(this.params);
        if (this.status !== 0) {
            return this.status;
        }
        //connectRest();
        return this.status;
    };
    return mceHandler;
}());
export { mceHandler };

import { stat } from "fs";
import doMCE from "./execGDAL";

/*
function mceHandler(raster: string[], extend: number[], weights: string[]) {
    //Convert input to arrays

    //Call doMce

    //Call RestApi
    
}*/
interface WarpParams {
    raster: string[],
    extend: string,
    sourceSrs?: string,
};
interface CalcParams {
    raster: string[],
    weights: number[],
    outputName: string
};

interface MceParams extends CalcParams, WarpParams { };
export class mceHandler{
    
    status: number = 0;
    response: string = 'MCE is pending';

    params: MceParams = {
        raster: [],
        weights: [],
        extend: "",
        outputName: "test",
    }    

    constructor(input: string){
        this.resolveParams(input);
    }

    resolveParams(params: string):void {
        const json = JSON.parse(params);
        if(json.hasOwnProperty("raster")&&json.hasOwnProperty("extend")&&json.hasOwnProperty("weights")){
            this.params.raster = json.raster;
            this.params.extend = json.extend;
            this.params.weights = json.weights;
        } else {
            this.status = 500;
        }
    };

    getStatus(): number{
        return this.status;
    };

    setStatus(status: number):void{
        this.status = status;
    };

    startMCE(){
        if(this.status !== 0){
            return this.status;
        }
        doMCE(this.params);

        if(this.status !== 0){
            return this.status;
        }

        //connectRest();
        return this.status;
    }
}
import doMCE from "./execGDAL";
export interface Status {
    code: number,
    message: string,
    resultname?: string | null,
    error?: Error
};
interface gdalParams {
    raster: string[],
    warpedtemp?: string,
};
interface WarpParams extends gdalParams {
    extend: string,
    sourceSrs?: string,
};
interface CalcParams extends gdalParams {
    weights: number[],
    outputName?: string
};
export interface MceParams extends CalcParams, WarpParams { };


export function mceHandler(input:any) {
    const status: Status = {
        code: 0,
        message: 'inital',
    };
    const params: MceParams ={
        raster:[],
        extend:"",
        weights:[],
    };
    const temp = resolveParams(input);
    if(temp===undefined){
        throw new Error("test");        
    } else {
        params.raster = temp.raster;
        params.extend = temp.extend;
        params.weights = temp.weights;
    };
    let output: string ="";
    try{
    output = doMCE(params);
    } catch (e){
        console.log("ERROR");
    };
    console.log(output);    
}

export function  resolveParams(input:any):MceParams |undefined {
    if (input.hasOwnProperty("raster") && input.hasOwnProperty("extend") && input.hasOwnProperty("weights")) {
        const raster = input.raster;
        const extend = input.extend;
        const weights = input.weights;
        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
        };
        if (raster.length < 2 || raster.length > 26 || raster.length !== weights.length || sum > 1) {
            console.log("Error")
        } else {
            return {
                raster: raster,
                extend: extend,
                weights: extend,
            }
        }
    } else {
        console.log("Error");
    };
};

function  test() {
    const test =  
        {
            "raster": ["Bevjekm2Skaliert","Ue65Skaliert","HeatWaveSpellNorm"],
            "extend": "955442.7350882173 6965590.539027553 1007145.8757782301 7020798.977391465",
            "weights": [0.3, 0.4, 0.3],
        }
    ;
    mceHandler(test);        
}

//test();
/*
export class MceHandler {

    status: Status = {
        code: 0,
        message: 'inital',
    };

    params: MceParams = {
        raster: [],
        weights: [],
        extend: ""
    };

    constructor(input: any) {
        this.status.code = 0;
        this.status.message = 'not yet started';
        this.resolveParams(input)
    };

    getStatus(): Status {
        return this.status;
    };

    resolveParams(input: any): void {
        if (input.hasOwnProperty("raster") && input.hasOwnProperty("extend") && input.hasOwnProperty("weights")) {
            const raster = input.raster;
            const extend = input.extend;
            const weights = input.weights;
            let sum = 0;
            for (let i = 0; i < weights.length; i++) {
                sum += weights[i];
            };
            if (raster.length < 2 || raster.length > 26 || raster.length !== weights.length || sum > 1) {
                this.status.code = 500,
                this.status.message = 'ERROR: Fehlerhafte eingabe';
            } else {
                this.params.raster = raster;
                this.params.extend = extend;
                this.params.weights = weights;
                this.status.code = 420;
            }
        } else {
            this.status.code = 500;
            this.status.message = 'ERROR: Fehlerhafte eingabe';
        };
    };


    startMCE(): Status {
        if (this.status.code !== 0) {
            return this.status;
        }
        try {
            const name = doMCE(this.params);
            this.status.resultname = name;
        } catch (err) {
            this.status.code = 400,
            this.status.message = err.toString();
            this.status.error = err;
            return this.status
        };
        
        try {
            const dummy = connect_rest(this.status.resultname);
            this.status.code = 200;
            this.status.message = 'Succes';
        } catch (err) {
            this.status.code = 400;
            this.status.error = err;
            this.status.resultname = null;
            this.status.message = err.toString();
        } finally {
            return this.status;
        }
    };

};

function test() {
    const testIn = [
        {
            "raster": ["Bevjekm2Skaliert","Ue65Skaliert","HeatWaveSpellNorm"],
            "extend": "955442.7350882173 6965590.539027553 1007145.8757782301 7020798.977391465",
            "weights": [0.3, 0.4, 0.3],
            "gelp": "https://gist.github.com/subfuzion/08c5d85437d5d4f00e58"
        }
    ];
    const test = new MceHandler(testIn[0]);
    console.log(test.getStatus());
};

test();

*/

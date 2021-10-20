import { getCurrentExtend } from '../mapController/IndikatorGroup';
import { addResult } from '../mapController/IndikatorGroup';

export interface Factor{
    factor: string,
    weight: number  
}
export interface MCE{
    factors: Factor[]
}

export const startMce = (mce: MCE) =>{
    const input = reseolveInput(mce);
    console.log(input)


    fetch('mce', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    }).then((res)=>res.json())
    .then((json)=>{
        const result = json.hasOwnProperty("result")?  json.result : "null";
       addResult(result);
    })

}

export const reseolveInput = (mce: MCE)=>{

    let sum = 0;
    let weights: number[] = [];
    for(let i =0; i<mce.factors.length;i++){
        sum+=mce.factors[i].weight;
    };
    if(sum!==0){
        weights = mce.factors.map((factor)=>(factor.weight/sum))
    };    
    const factors: string[] = mce.factors.map((factor)=>(factor.factor));
    const mapExtend = getCurrentExtend();
    const extend = [mapExtend[1],mapExtend[0]].concat(mapExtend.slice(2,4)).join(" ");
    const testExtent = mapExtend.join(" ");


    return (
        {
            raster: factors,
            extend: testExtent,
            weights: weights,
        }
    )
};

export default startMce;
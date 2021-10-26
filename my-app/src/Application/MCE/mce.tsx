export interface Factor{
    factor: string,
    weight: number  
}
export interface MCE{
    factors: Factor[],
    extend?: number[]
};

export const startMce = async (mce: MCE) =>{
    const input = reseolveInput(mce);
    //const result: string[] = [];
    
    const response = await fetch('mce', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
    
    const json = await response.json();
    const temp = json.hasOwnProperty("result")?  json.result :null;  
    return temp;

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

    return (
        {
            raster: factors,
            extend: mce.extend,
            weights: weights,
        }
    )
};

export default startMce;
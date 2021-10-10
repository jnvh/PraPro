import map from '../Drawer/IndikatorGroup'
import OlMap from 'ol/Map';
//ReactGeo
import {
    useMap
} from '@terrestris/react-geo';


interface mceInput{
    factors: string[],
    weights: number[],
    //extned: number[],
};

export function getFactors(): string[]{
    return ["test1", "test2", "test3"]
};

export function getWeigthts(): number[]{
    return [0.3, 0.4, 0.4];
};

/*export function getExtend(map: OlMap): number[] | undefined{
    return map.getSize();    
};*/

export function passMceInput(): string | null{
    const mceInput: mceInput ={
        factors: getFactors(),
        weights: getWeigthts(),
        //extned: getExtend(),
    };
    let sum = 0;
    for(let i in mceInput.weights){
        sum =+ mceInput.weights[i];
    };
    if(mceInput.factors.length!=mceInput.weights.length || sum>1){
        return null;
    };
    return JSON.stringify(mceInput);
}

export default passMceInput();





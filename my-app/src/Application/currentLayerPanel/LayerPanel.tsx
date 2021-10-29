import './currentLayerPanels.css';

import { Card, Table, Tooltip } from 'antd';
import {
    getCurrentLayerMce }
    from '../mapController/IndikatorGroup';


import {Panel} from '@terrestris/react-geo';
interface PanelProps{
    layer: string
}
export const LayerPanel = ({layer}:PanelProps):JSX.Element => {

    const style = {
        left: '100px',
        top: '20px',
    };
    const divStyle = {
        padding: '5px'
    }
    const mce = getCurrentLayerMce();

    const info = mce ? (<div>       
    </div>) : (<div></div>);

  


    if(layer){
    return(
        
        <Panel style={style}>
                <div style={divStyle}>
                    {layer}
                </div>
                {info}
        </Panel>
    );
    } else {
        return (<div></div>)
    }
};



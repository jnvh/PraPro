import BaseLayer from 'ol/layer/Base';
import { Button } from 'antd';
import { useState } from 'react';
import config from '../../configs/config.json'

interface LayerNodeProps {
    layer: BaseLayer,
    onClick: (name: string, change: boolean) => void
}

export const LayerNode = ({ layer, onClick }: LayerNodeProps): JSX.Element => {

    const [checked, setChecked] = useState<boolean>(false);
    const name = layer.get("name");

    if (!config.LayerNames.includes(name)) {
        return (<div>{name}</div>)
    };

    function clickedIndikator() {
        setChecked(!checked);
        onClick(name,true);
    };
    return (

        <Button
            type={'text'}
            className={checked ? "buttoncheck" : "buttonunchekd"}
            onClick={clickedIndikator} 
        >
            {name}
        </Button>
    );
}
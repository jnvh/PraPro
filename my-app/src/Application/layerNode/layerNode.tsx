import BaseLayer from 'ol/layer/Base';
import { Button, Dropdown, Slider, Menu } from 'antd';
import { useState } from 'react';
import config from '../../configs/config.json';
import { LayerTransparencySlider } from '@terrestris/react-geo'
interface LayerNodeProps {
    layer: BaseLayer,
    onClick: (name: string, change: boolean) => void,
    setTop: ()=>void
}
interface LayerSliderProps {
    layer: BaseLayer,
    visible: boolean
}
export const LayerNode = ({ setTop, layer, onClick }: LayerNodeProps): JSX.Element => {
    setTop();

    const [checked, setChecked] = useState<boolean>(false);
    const name = layer.get("name");
    const [openSlider, setSlider] = useState<boolean>(false);

    if (!config.LayerNames.includes(name)) {
        return (<div>{name}</div>)
    };

    function clickedIndikator() {
        setChecked(!checked);
        onClick(name, true);
    };

    function toggleSlider() {
        setSlider(!openSlider);
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={clickedIndikator}>
                Add to evaluation
            </Menu.Item>
            <Menu.Item onClick={toggleSlider}>
                Change layer opacity
            </Menu.Item>
        </Menu>
    )
    return (
        <>
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <Button
                    type={'text'}
                    className={checked ? "buttoncheck" : "buttonunchekd"}
                    onClick={clickedIndikator}
                    style={{width:'140px',textAlign:'left'}}
                >
                    {name}
                </Button>
            </Dropdown>
            <LayerSlider visible={openSlider} layer={layer} />
        </>
    );
};

const LayerSlider = ({ visible, layer }: LayerSliderProps): JSX.Element => {
    if (visible) {
        return (
            <LayerTransparencySlider layer={layer} />
        );
    } else return (<></>);
}


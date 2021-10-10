import './infobox.css';
import { getCurrentLayerName } from '../Drawer/IndikatorGroup';
import desc from '../../configs/desc.json';
import { Card } from 'antd';

export interface InfoboxProps {
    visible: boolean
};

export const getIndicatorInfo = () => {
    const name = getCurrentLayerName();
    const descs = desc.indicators;
    for (let i = 0; i < descs.length; i++) {
        if (descs[i][0] === name) {
            return descs[i][1];
        }
    };
    return "Du siehst den Basislayer!";
};

export const Infobox = (props: InfoboxProps): JSX.Element |null => {
    if (props.visible) {
        return (
            <Card className="infoCard" title="Layer Informationen">{getIndicatorInfo()}</Card>
        );
    };
    return null;
};

export default Infobox;
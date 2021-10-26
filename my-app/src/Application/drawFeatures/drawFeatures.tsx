import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import { MCE } from '../MCE/mce'
import { useMap } from '@terrestris/react-geo';
import { Vector } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import ExtentInteraction from 'ol/interaction/Extent';
import { Dropdown, Button } from 'antd';

interface DrawModeProps {
    type: string,
    toggle: () => void;
    mce: MCE,
    visible: boolean,
    setType: (type: string) => void,
};

export const DrawMode = ({ setType, type, toggle, mce, visible }: DrawModeProps): JSX.Element => {
    const map = useMap();
    if (!visible) { return (<div />) };
    const extent = new ExtentInteraction();
    const source = new VectorSource({ wrapX: false });
    const vector = new Vector({ source: source });
    const drawInter = new Draw({
        source: source,
        type: 'Polygon'
    });

    const draw = () => {
        switch (type) {
            case 'Rectangle':
                map.addInteraction(extent);
                break;
            case 'Polygon':
                drawInter.setProperties({ type: 'draw' })
                drawInter.on('drawstart', () => {
                    source.clear();
                })
                map.addLayer(vector);
                map.addInteraction(drawInter);
                break;
        };
    };

    const stop = () => {
        console.log(type)
        switch (type) {
            case 'Rectangle':
                extent.setActive(false);
                mce.extend = extent.getExtent();
                map.removeInteraction(extent);
                break;
            case 'Polygon':
                const feature = source.getFeatures().pop();
                if (feature) {
                    console.log('has feature');
                    const obj = new GeoJSON().writeFeatureObject(feature);
                    const test = JSON.stringify(obj);
                    console.log(test);
                    mce.extend = feature.getGeometry()?.getExtent();
                    map.removeInteraction(drawInter);
                    source.clear();
                    map.removeLayer(vector);
                };
                break;
        }
    };

    const switchGeom = () => {
        stop();
        type = type === 'Rectangle' ? 'Polygon' : 'Rectangle';
        draw();
    };

    const choices = (
        <div>
            <Button onClick={switchGeom}>
                Rectangle
            </Button>
            <Button onClick={switchGeom}>
                Polygon
            </Button>
        </div>
    )

    draw();

    return (
        <div>
            <Button onClick={draw}>
                Draw new extend
            </Button>
            <Button 
            onClick={() => {
                stop();
                setType(type);
                toggle();
            }}>
                Confirm
            </Button>
        </div>
    )
};

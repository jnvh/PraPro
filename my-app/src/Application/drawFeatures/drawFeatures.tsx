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
        switch (type) {
            case 'Rectangle':
                mce.extend = extent.getExtent();
                map.removeInteraction(extent);
                mce.poly = undefined;
                break;
            case 'Polygon':
                const feature = source.getFeatures().pop();
                if (feature) {
                    const obj = new GeoJSON().writeFeatureObject(feature);
                    mce.poly = obj;
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
        const geom = (type === 'Rectangle') ? 'Polygon' : 'Rectangle';
        type = geom;
        setType(geom);
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
            <Dropdown.Button overlay={choices} onClick={draw}>
                Draw new {type}
            </Dropdown.Button>
            <Button 
            onClick={() => {
                stop();
                toggle();
            }}>
                Confirm
            </Button>
        </div>
    )
};

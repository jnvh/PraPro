import './footer.css';
import {
    getCurrentExtend,
    getCurrentLayerName,
    getCurrentLayerSource,
    getCurrentRes
} from '../mapController/IndikatorGroup'
import {
    useMap
} from '@terrestris/react-geo';
import {toLonLat} from 'ol/proj';

import { useState, useEffect } from 'react';
import  config  from '../../configs/config.json';

export const Footer = (): JSX.Element => {
    const map = useMap();
    const [coords, setCoords] = useState<string>("");
    const [topLayer, setTopLayer] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [data, setData] = useState<string>("");  
    

    useEffect(() => {
        map.on('change', function event() {
            setTopLayer(getCurrentLayerName());
            setValue("");
            const j = {
                test: getCurrentLayerName()
            };
        });

        map.on('pointermove', function event(e) {
            const coords = map.getCoordinateFromPixel(e.coordinate);
            const lonlat = map.getCoordinateFromPixelInternal(e.coordinate);
            console.log(lonlat);
            console.log(toLonLat(lonlat))
            setCoords(coords[0].toFixed(2) + " : " + coords[1].toFixed(2));
        });

        map.on('singleclick', function valueListener(event) {            
            const test = map.getLayers();
            const coords = map.getCoordinateFromPixel(event.coordinate);
            const ext = getCurrentExtend();  
            const source = getCurrentLayerSource();
            let prevent = false;
            map.getInteractions().forEach((i)=>{
                if(i.get('type')==='draw'){
                    prevent=true;
                }
            })
            
            if (source && !prevent) {
                const url = source.getFeatureInfoUrl(
                    event['coordinate'],
                    getCurrentRes(),
                    'EPSG:3857',
                    { 'INFO_FORMAT': 'application/json' }
                );

                if (url) {
                    fetch(url)
                        .then((response) => {
                            return response.text()
                        })
                        .then((info) => {
                            const obj = JSON.parse(info);
                            const features = obj.hasOwnProperty("features") ? obj.features[0] : null;
                            const properties = features !== null && features.hasOwnProperty("properties") ? features.properties : null;
                            if (properties !== null && properties.hasOwnProperty("GRAY_INDEX")) {
                                setValue(": " + properties.GRAY_INDEX + "/100");
                            };
                        });
                }
            }
        });

    }, [map]);

    return (
        <div>
            <div className="wrapper" />
            <div className="footer" style={{backgroundColor: config.style.maincolor}} >
                {data + value}
                <br />
                {coords}
            </div>           

        </div>
    );
};
export default Footer;
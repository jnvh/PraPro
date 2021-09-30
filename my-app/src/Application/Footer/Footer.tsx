import './footer.css';
import {
    getCurrentLayerName,
    getCurrentLayerSource,
    getCurrentRes
} from './../Drawer/IndikatorGroup'
import {
    useMap
} from '@terrestris/react-geo';
import { useState, useEffect } from 'react';

export const Footer = (): JSX.Element => {
    const map = useMap();
    const [coords, setCoords] = useState<string>("");
    const [topLayer, setTopLayer] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const [data, setData] = useState(null);

    /*

    useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    */
    
 

    useEffect(() => {
        map.on('change', function event() {
            console.log("change");
            setTopLayer(getCurrentLayerName());
            setValue("");
            fetch("/api",{
                method: 'PUT',
                headers:{
                'Content-Type':'application/json'
                },
                body: topLayer
            })
            .then((res) => res.json())
            .then((data) => setData(data));
        });
        map.on('pointermove', function event(e) {
            const coords = map.getCoordinateFromPixel(e.coordinate);
            setCoords("lon " + coords[0].toFixed(4) + ", lat " + coords[1].toFixed(4));
        });

        map.on('singleclick', function valueListener(event) {

            if (getCurrentLayerSource()) {
                const url = getCurrentLayerSource().getFeatureInfoUrl(
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
            <div className="footer" >
                {data + value}
                <br />
                {coords}
            </div>

        </div>
    );
};
export default Footer;
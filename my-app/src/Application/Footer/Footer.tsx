import React from 'react';
import './footer.css';

import {getCurrentLayerName, 
        getCurrentLayerSource,
        getCurrentRes
       } from './../Drawer/IndikatorGroup'
import {
    useMap
  } from '@terrestris/react-geo';
import { useState } from 'react';

export const Footer =():JSX.Element=>{
    const map = useMap();

    const [coords, setCoords] = useState<string>("");
    const [topLayer, setTopLayer] = useState<string>(getCurrentLayerName());     


    map.on('change', function event() {
        setTopLayer(getCurrentLayerName());        
    });
    map.on('pointermove', function event(e) {
        const coords = map.getCoordinateFromPixel(e.coordinate);
        setCoords("lon "+ coords[0].toFixed(4) + ", lat "+ coords[1].toFixed(4));
    });
    map.on('singleclick', function valueListener(event) {

        console.log(event.coordinate);
        console.log(getCurrentLayerName());
        console.log(getCurrentRes());

        console.log(getCurrentLayerSource()); 

        const url = getCurrentLayerSource().getFeatureInfoUrl(
            event['coordinate'],
            getCurrentRes(),
            'ESPG:3035',
            {'INFO_FORMAT': 'text/html'}
        );

        console.log(url);

        if (url) {
            fetch(url)
              .then((response) => response.text())
              .then((info) => {
                console.log(info);
              });
          }
    });  
    
    return(
        <div>
            <div className= "wrapper" />
            <div className= "footer" >
                {topLayer}
                <br/>
                {coords}
                               
            </div>
            
        </div>
    );
};
export default Footer;
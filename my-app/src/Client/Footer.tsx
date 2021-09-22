import React from 'react';
import './styles/footer.css';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import map, { layerGroup } from './Drawer/IndikatorGroup';
import {
    useMap, UserChip
  } from '@terrestris/react-geo';
import { useState } from 'react';

export const Footer =():JSX.Element=>{

    //const coord = map.getCoordinateFromPixel([233, 234]).join(', ');

    const map = useMap();

    const name = map.getProperties().currentLayername;
    
    return(
        <div>
            <div className= "wrapper" />
            <div className= "footer" >
                {name}
            </div>
        </div>
    );
}

export default Footer;
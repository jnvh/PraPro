import React from 'react';
import './styles/footer.css';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import map, { layerGroup } from './Drawer/IndikatorGroup';
import {
    useMap, UserChip
  } from '@terrestris/react-geo';
import { useState } from 'react';

interface FooterProps{
    layerName:string
}

export const Footer =(props: FooterProps):JSX.Element=>{

    //const coord = map.getCoordinateFromPixel([233, 234]).join(', ');
    console.log('footer');

    return(
        <div>
            <div className= "wrapper" />
            <div className= "footer" >
                {props.layerName}
            </div>
        </div>
    );
}

export default Footer;
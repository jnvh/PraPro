import React, { useState } from 'react';
import { TreeDrawer } from './Drawer/TreeDrawer';
import { map } from './Drawer/IndikatorGroup';
import { MapHeader } from './MapHeader';
import { Footer } from './Footer';
import './styles/RiskMap.css';
//ReactGeo
import {
    MapComponent,
    MapContext
} from '@terrestris/react-geo';


export function Application(): JSX.Element {
    const name = map.getProperties().currentLayername;
    console.log(name);
    return (
        <div className="App">
             <MapContext.Provider value={map}>
                <MapHeader />
                <MapComponent
                    map={map}
                />
                <TreeDrawer />
                <Footer 
                    layerName= {name}                
                />
            </MapContext.Provider>
        </div>
    );
};

export default Application;
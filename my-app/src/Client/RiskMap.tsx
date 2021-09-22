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


export function RiskMap(): JSX.Element {
    return (
        <div className="App">
             <MapContext.Provider value={map}>
                <MapHeader />
                <MapComponent
                    map={map}
                />
                <TreeDrawer />
                <Footer />
            </MapContext.Provider>
        </div>
    );
};

export default RiskMap;
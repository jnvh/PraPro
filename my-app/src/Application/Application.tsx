import { TreeDrawer } from './Drawer/TreeDrawer';
import { MapHeader } from './Header/MapHeader';
import { Footer } from './Footer/Footer';
import './Application.css';
import map from './Drawer/IndikatorGroup'
//ReactGeo
import {
    MapComponent,
    MapContext
} from '@terrestris/react-geo';

export function Application(): JSX.Element {

    return (
        <div className="App">
            <MapContext.Provider
                value={map}>
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

export default Application;
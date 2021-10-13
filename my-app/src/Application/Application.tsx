import { TreeDrawer } from './Drawer/TreeDrawer';
import { MapHeader } from './Header/MapHeader';
import { Footer } from './Footer/Footer';
import './Application.css';
import map from './Drawer/IndikatorGroup';
import { BottomMenu } from './menuBotomRight/bottommenu';
import {ScaleCombo} from '@terrestris/react-geo/';
import { SearchBar } from '../nominatedSearch/searchbar';


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
                <MapComponent
                    map={map}
                />
                <TreeDrawer />
                <Footer />
                <BottomMenu/>
            </MapContext.Provider>
            <ScaleCombo map={map} className = 'scale' />
            <SearchBar map={map}/>
        </div>
    );
};

export default Application;
import { useMap, NominatimSearch} from '@terrestris/react-geo/';
import { OlHTMLAttributes } from 'react';
import OlMap from 'ol/Map';
import './searchbar.css';

interface sb{
    map: OlMap
}
export const SearchBar=(props: sb):JSX.Element=>{
    return(
        <div>
            <NominatimSearch
            map={props.map}
            key="search"
            className='searchbar'
            />
        </div>
    )
};
import OlMap from 'ol/Map';
import OlLayerGroup from 'ol/layer/Group';
import {
  LayerTree
} from '@terrestris/react-geo';

import 'antd/dist/antd.css';
import './styles/react-geo.css';

export interface TreeProps{
    map: OlMap,
    layerGroup: OlLayerGroup
  };

export const Tree = (props: TreeProps):JSX.Element =>{
    return (
        <LayerTree
          map={props.map}
          layerGroup={props.layerGroup}
        />
    ); 
};

export default Tree;
import OlMap from 'ol/Map';
import OlLayerGroup from 'ol/layer/Group';
import {
  LayerTree, useMap
} from '@terrestris/react-geo';
import map, {getCurrentLayerName} from './IndikatorGroup'

import 'antd/dist/antd.css';

export interface TreeProps{
    map: OlMap,
    layerGroup: OlLayerGroup
  };

export const Tree = (props: TreeProps):JSX.Element =>{

  const layerName = getCurrentLayerName(props.layerGroup);
  map.setProperties({
    currentLayername: layerName
  });

    console.log('TreeRender');
    return (
        <LayerTree
          map={props.map}
          layerGroup={props.layerGroup}
        />
    ); 
};

export default Tree;
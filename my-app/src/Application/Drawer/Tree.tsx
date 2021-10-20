import OlMap from 'ol/Map';
import OlLayerGroup from 'ol/layer/Group';
import { LayerTree } from '@terrestris/react-geo';
import { LayerNode } from '../layerNode/layerNode';
import React from 'react';
import { MCE } from '../MCE/mce';

export interface TreeProps {
  map: OlMap,
  layerGroup: OlLayerGroup,
  onClick: (name:string, change: boolean)=>void,
};

export const Tree = (props: TreeProps): JSX.Element => {

 return (
 <LayerTree
        map={props.map}
        layerGroup={props.layerGroup}
        filterFunction={(layer) => layer.get("name") != "Basislayer"}
        nodeTitleRenderer={(layer) => <LayerNode layer={layer} onClick={props.onClick} />}
      />)
};

export default Tree;
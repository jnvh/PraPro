//React
import React, { useState } from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerGroup from 'ol/layer/Group';
import XYZSource from 'ol/source/XYZ';

//Antd
import { Drawer } from 'antd';

//ReactGeo
import {
  MapComponent,
  SimpleButton,
} from '@terrestris/react-geo';

//SRC
import { Tree } from './Tree';
import './styles/react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';


//Openlayers
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import TileLayer from 'ol/layer/Tile';

export const getRasterSource = (url: string, name: string): ImageLayer<ImageWMS> => {
  const raster = new ImageLayer({
    source: new ImageWMS({
      url: url,
      params: { 'LAYERS': name },
      serverType: 'geoserver'
    }),
    visible: false
  });
  raster.setProperties({ name: name });
  return raster;
}

const sourceLayers: string[][] = [
  ["http://localhost:8080/geoserver/prapro/wms?",
    'Bevjekm2Skaliert'
  ],
  ["http://localhost:8080/geoserver/prapro/wms?",
    "builtup_boolean"
  ],
  ["http://localhost:8080/geoserver/prapro/wms?",
    "Versigelungsgrad0bis100"
  ],
  ["http://localhost:8080/geoserver/prapro/wms?",
    "Ue65Skaliert"
  ],
  ["http://localhost:8080/geoserver/prapro/wms?",
    "HeatWaveSpellNorm"
  ]
];

export const getLayers = (sourceLayers: string[][]): (ImageLayer<ImageWMS> | TileLayer<XYZSource>)[] => {
  const baseLayer = new OlLayerTile({
    source: new XYZSource({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
    })
  })
  baseLayer.setProperties({ name: "Basislayer" });
  const layers: (ImageLayer<ImageWMS> | TileLayer<XYZSource>)[] = [baseLayer];
  for (let i = 0; i < sourceLayers.length; i++) {
    layers.push(getRasterSource(sourceLayers[i][0], sourceLayers[i][1]));
  }
  return layers;
}

export const layerGroup = new OlLayerGroup({
  layers: getLayers(sourceLayers)
});

export const center: number[] = [788453.4890155146, 6573085.729161344];

export const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 6.5,
  }),
  layers: [layerGroup]
});

export const TreeDrawer = (): JSX.Element => {

  const [visible, setVisible] = useState<boolean>(false);
  const toggleDrawer = () => { setVisible(!visible); }

  return (
    <div className="App">
      <MapComponent
        map={map}
      />
      <SimpleButton
        style={{ position: 'fixed', top: '30px', right: '30px' }}
        onClick={toggleDrawer}
        iconName="bars"
      />
      <Drawer
        title="Wähle einen Layer aus"
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
      >
        <Tree
          map={map}
          layerGroup={layerGroup} />
      </Drawer>
    </div>
  );
};

export default TreeDrawer;

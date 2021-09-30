//Openlayers
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import Projection from 'ol/proj/Projection';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerGroup from 'ol/layer/Group';
import XYZSource from 'ol/source/XYZ';
//Styles
import 'ol/ol.css';
//Config
import config from '../../configs/config.json';

export const getRasterSource = (url: string, name: string): ImageLayer<ImageWMS> => {
  const raster = new ImageLayer({
    source: new ImageWMS({
      url: url,
      params: { 'LAYERS': name },
      serverType: 'geoserver',
    }),
    visible: false,
  });
  raster.setProperties({ name: name });
  console.log(raster.getSource());
  return raster;
};

export const loadBase = () => {
  const basisLayer = new OlLayerTile({
    source: new XYZSource({
      url: config.Basislayer.url,
    })
  })
  basisLayer.setProperties({
    name: config.Basislayer.name
  });
  return basisLayer;
}

export const loadIdicators = () => {
  const indicators: ImageLayer<ImageWMS>[] = [];
  for (let i = 0; i < config.LayerNames.length; i++) {
    indicators.push(getRasterSource(config.Geoserver, config.LayerNames[i]));
  }
  return indicators;
}

export const layerGroup = new OlLayerGroup({
  layers: loadIdicators()
});

export const loadOverlayLayer = () => {
  const overlayLayer = new OlLayerTile({
    source: new XYZSource({
      url: config.OverlayLayer.url
    })
  })
  overlayLayer.setProperties({
    name: config.OverlayLayer.name
  });
  return overlayLayer;
}

export const map = new OlMap({
  view: new OlView({
    "center":[788453.4890155146, 6573085.729161344],
    "zoom": 6,
    "minZoom": 6
  }),
  layers: [
    loadBase(),
    layerGroup,
    //loadOverlayLayer()
  ]
});

export const getCurrentLayerName = (): string => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length - 2; i > 0; i--) {
      if (layers[i].getVisible()) {
      return layers[i].getProperties().name;
    };
  };
  return "";
};

export const getCurrentLayerSource = () => {
  
  const layers = map.getLayerGroup().getLayersArray();

  for (let i = layers.length - 2; i > 0; i--) {
      if (layers[i].getVisible()) {            
        return layers[i].getSource();
    };
  };
  return null;  
}

export function getCurrentRes():number {
  const resolution =map.getView().getResolution();
  if(typeof resolution==="number" ){
      return resolution; 
  };
  return 0;
};

export default map;

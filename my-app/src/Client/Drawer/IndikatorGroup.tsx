//Openlayers
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import TileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerGroup from 'ol/layer/Group';
import XYZSource from 'ol/source/XYZ';
//Styles
import './../../react-geo.css';
import 'ol/ol.css';
//Config
import config from '../../configs/config.json';
import LayerGroup from 'ol/layer/Group';

export const getRasterSource = (url: string, name: string): ImageLayer<ImageWMS> => {
  const raster = new ImageLayer({
    source: new ImageWMS({
      url: url,
      params: { 'LAYERS': name },
      serverType: 'geoserver'
    }),
    visible: false,
  });
  raster.setProperties({ name: name });
  return raster;
};
  
export const getCurrentLayerName = (group: OlLayerGroup): string =>{
  let name: string = "";
  const lArry = group.getLayersArray();
  for(let i = 0; i<lArry.length;i++){
    if(lArry[i].getVisible()){
      name = lArry[i].getProperties().name;
    };
  };
  return name;
};

export const getLayers = (): (ImageLayer<ImageWMS> | TileLayer<XYZSource>)[] => {    
  const baseLayer = new OlLayerTile({
    source: new XYZSource({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
    })
  })
    
  baseLayer.setProperties({ name: "Basislayer" });
  const layers: (ImageLayer<ImageWMS> | TileLayer<XYZSource>)[] = [baseLayer];
  for (let i = 0; i< config.LayerNames.length;i++) {
    layers.push(getRasterSource(config.Geoserver, config.LayerNames[i])); 
    console.log(config.Geoserver);
    console.log(config.LayerNames[i]);
  }
  return layers;
}

export const layerGroup = new OlLayerGroup({
  layers: getLayers()
}); 

export const center: number[] = [788453.4890155146, 6573085.729161344];
  
export const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 6.5,
  }),
  layers: [layerGroup]
});

map.setProperties({
  currentLayername: getCurrentLayerName(layerGroup)
});
  
export default map;

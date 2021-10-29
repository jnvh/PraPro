import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import Geolocation from 'ol/Geolocation';
import { toLonLat } from 'ol/proj';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerGroup from 'ol/layer/Group';
import XYZSource from 'ol/source/XYZ';
import 'ol/ol.css';
import config from '../../configs/config.json';
import { Raster as RasterSource, Stamen } from 'ol/source';
import XYZ from 'ol/source/XYZ';

import TileImage from 'ol/source/TileImage';
import { MCE } from '../MCE/mce';
import TileWMS from 'ol/source/TileWMS';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { response } from 'express';
import BaseLayer from 'ol/layer/Base';

//Gibt einen ImageLayer zurück der eine ImageWMS Source verwendet, 
//url und name werden über Paremeter entgegen genommen.
export const getImageWMS = (url: string, name: string): ImageLayer<ImageWMS> => {
  const raster = new ImageLayer({
    source: new ImageWMS({
      url: url,
      params: { 'LAYERS': name },
      serverType: 'geoserver',
    }),
    visible: false,

  });
  raster.setProperties({ name: name });
  return raster;
};

export const mceOperation = (): number[] | ImageData => {
  return [];
};

export const getRasterSource = () => {
  const test = "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/prapro%3AHitzewellen@EPSG%3A4326@jpeg/{z}/{x}/{-y}.jpg";

  const raster = new RasterSource({
    sources: [
      getImageWMS(config.Geoserver, 'Hitzewellen')
    ],
    operation: (pixel, data) => {
      return pixel[0];
    }
  })

  return new ImageLayer({
    source: raster
  })
};

const testTMS = () => {
  const url = "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/prapro%3APopulationsdichte@EPSG%3A4326@png/{z}/{x}/{-y}.jpg";
  const basisLayer = new OlLayerTile({
    source: new XYZSource({
      url: url
    })
  })
  return basisLayer;
};

const testWMTS = () => {
  const parser = new WMTSCapabilities();

  fetch('http://localhost:8080/geoserver/gwc/service/wmts?REQUEST=GetCapabilities')
    .then(function (response) {
      console.log(response);
      return response.text();
    }).then(function (text) {
      const result = parser.read(text);
      const options = optionsFromCapabilities(result, {
        layer: 'Hitzewellen',
        matrixSet: 'EPSG:4326',
      });
      if (options) {
        const test = new TileLayer({
          opacity: 1,
          source: new WMTS(options)
        })
        console.log(test);
      }
    }).catch((res) => {
      console.log(res)
    }
    )

}
testWMTS();
/*
export const getRasterLayer = (): ImageLayer<RasterSource> => {
  const layer = new ImageLayer({
    source: loadBase()
  });
  return layer;
};
*/
//Ladet den BasisLayer als OlLayerTile über die Config und gibt ihn zurück. Verwendet eine XYZ Source
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

//Führt getRasterSource für jeden Indikator in der Config aus und gibt alle als ImageLayer<ImageWMS>[] zurück
export const loadIdicators = (): OlLayerGroup => {
  const indicators: ImageLayer<ImageWMS>[] = [];
  for (let i = 0; i < config.LayerNames.length; i++) {
    indicators.push(getImageWMS(config.Geoserver, config.LayerNames[i]));
  }

  const layerGroup = new OlLayerGroup({
    layers: indicators
  })
  layerGroup.setProperties({ name: "Indikatoren" });
  return layerGroup;
}

const results: string[] = [];
export const loadResults = (factors?: MCE): OlLayerGroup => {
  const resultLayer: ImageLayer<ImageWMS>[] = [];
  if (results) {
    for (let i = 0; i < results.length; i++) {
      const newRaster = getImageWMS(config.Geoserver, results[i]);
      if (i === results.length - 1) {
        newRaster.setVisible(true);
        newRaster.setProperties({ mce: factors })
      }
      resultLayer.push(newRaster);
    }
  }
  const layerGroup = new OlLayerGroup({
    layers: resultLayer
  })
  layerGroup.setProperties({
    name: "Ergebnisse",
  });
  return layerGroup;
};

export const addResult = (map: OlMap, name: string, factors: MCE): void => {
  results.push(name);
  map.setLayers([
    loadBase(),
    loadResults(factors),
    loadIdicators()
  ])
}

//Erstellt den OverlayLayer als OlLayerTile mit XYZ Source aus der Config und gibt ihn zrück
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

  view: new OlView(config.InitialView),
  layers:
    [
      loadResults(),
      loadBase(),
      loadIdicators(),
    ],
  controls: []
});

//Erstellt die map und füght BasisLayer, Indikatoren und Overlaylayer hinzu, der View wird in der Config definiert


//gibt den Namen des Indikators zurück der aktuell angezeigt wird, ignoriert Basis- und Overlaylayer
//Gibt "" zurück wenn keiner visible ist
export const getCurrentLayerName = (): string => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length - 2; i > 0; i--) {
    if (layers[i].getVisible()) {
      return layers[i].getProperties().name;
    };
  };
  return "";
};

export const getCurrentLayerMce = () => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length - 2; i > 0; i--) {
    if (layers[i].getVisible()) {
      return layers[i].getProperties().mce;
    };
  };
  return "";
};

export const getCurrentLayer = (): null | BaseLayer => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length - 1; i > 0; i--) {
    if (layers[i].getVisible()) {
      return layers[i]
    };
  };
  return null;
};

export const getLayerByName = (name: string): null | BaseLayer => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length; i > 0; i--) {
    if (layers[i].get('name') === name) {
      return layers[i];
    };
  };
  return null;
}

//gibt die Source des Indikators zurück der aktuell angezeigt wird, ignoriert Basis- und Overlaylayer
//Gibt null zurück wenn keiner visible ist
export const getCurrentLayerSource = (): ImageWMS | null => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length - 2; i > 0; i--) {
    if (layers[i] && layers[i].getVisible()) {
      
      return layers[i].getSource();

    };
  };
  return null;
}

export const getSourceByName = (name: string): ImageWMS | null => {
  const layers = map.getLayerGroup().getLayersArray();
  for (let i = layers.length -1; i > 0; i--) {
    if (layers[i] && layers[i].get('name') === name) {
      return layers[i].getSource();
    };
  };
  return null;
};

//gibt die Resoultion des Indikators zurück der aktuell angezeigt wird, ignoriert Basis- und Overlaylayer
//Gibt 0 zurück wenn keiner visible ist
export function getCurrentRes(): number {
  const resolution = map.getView().getResolution();
  if (typeof resolution === "number") {
    return resolution;
  };
  return 0;
};

//gibt den extend des aktuellen Views zurück
export function getCurrentExtend() {
  const ext = map.getView().calculateExtent(map.getSize());
  return ext;
};


export const zoomOut = () => {
  let currentzoom = map.getView().getZoom();
  if (currentzoom) {
    map.getView().animate({
      zoom: currentzoom - 1,
      duration: 150
    })
  }
};

export const zoomIn = () => {
  getCurrentExtend();
  let currentzoom = map.getView().getZoom();
  if (currentzoom) {
    map.getView().animate({
      zoom: currentzoom + 1,
      duration: 150
    })
  }
};

export const resetZoom = () => {
  map.getView().animate({
    zoom: config.InitialView.zoom
  })
};

const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: map.getView().getProjection(),
});

export const moveToGeolocation = () => {
  geolocation.setTracking(true);
  const position = geolocation.getPosition();
  const size = map.getSize();
  if (position && size) {
    map.getView().centerOn(position, [50, 50], toLonLat(position));
  }
  const currentzoom = map.getView().getZoom();
  if (currentzoom) {
    map.getView().animate({
      zoom: 9,
      duration: 150
    })
  }
}

export const readValueByName = (name: string, coords: number[]): number | string => {

  const source = getSourceByName(name);

  if (source) {
    const url = source.getFeatureInfoUrl(
      coords,
      getCurrentRes(),
      'EPSG:3857',
      { 'INFO_FORMAT': 'application/json' });

    if (url) {
      fetch(url)
        .then((response) => {
          return response.text()
        })
        .then((info) => {
          const obj = JSON.parse(info);
          const features = obj.hasOwnProperty("features") ? obj.features[0] : null;
          const properties = features !== null && features.hasOwnProperty("properties") ? features.properties : null;
          if (properties !== null && properties.hasOwnProperty("GRAY_INDEX")) {
            return properties.GRAY_INDEX;
          };
        });
    }

  } 
  return 'No Value';
}
export default map;

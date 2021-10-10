import { GeoTIFF, fromArrayBuffer } from 'geotiff';
import fetch from "node-fetch";
import config from '../configs/config.json';

export function getGeoTIFF(GeoTIFFname: string): GeoTIFF | null {

    let tif: GeoTIFF|null = null;

    const wcs = 'http://' + config.geoserver.url + '/ows?service=WCS&version=2.0.0&request=GetCoverage&coverageId=' + config.geoserver.factorws + ':' + GeoTIFFname + '&format=image/geotiff';

    fetch(wcs)
        .then((res)=> res.arrayBuffer())
        .then((buffer)=> fromArrayBuffer(buffer))
        .then((geotiff)=> tif = geotiff);

    return tif;

};

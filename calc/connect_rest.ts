import fetch from 'node-fetch';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');
const base64 = require('base-64');

export const postCoveragestore = async (name: string) => {
    
    const bodyJSON = {
        coverageStore: {
            name: name,
            url: `file:praproSource/mce/${name}.tif`,
            type: "GeoTIFF",
            enabled: true,
            workspace: {
                name: config.geoserver.resultws
            }
        }
    };

    const url = `${config.geoserver.url}rest/workspaces/${config.geoserver.resultws}/coveragestores`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Basic ${base64.encode(`${config.geoserver.user}:${config.geoserver.password}`)}`
        },
        body: JSON.stringify(bodyJSON)
    });
    const text = await response.text();
    console.log("CoverageStore: " + text)

    if (response.ok) { return text } 
    else { throw new Error("Erstellen fehlgeschlagen") };
};

export const postCoverage = async (name: string) => {  

    const url = `${config.geoserver.url}rest/workspaces/${config.geoserver.resultws}/coveragestores/${name}/coverages`;
    console.log(url);
    
    const bodyJSON = {
        coverage: {
            "abstract": "test",
            "defaultInterpolationMethod": "nearest neighbor",
            "name": name,
            "description": "Generated from mce",
            "enabled": true,
            "title": name,
            "srs": "EPSG:3035",
        }
    };

    console.log(bodyJSON);
    const response = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64.encode(`${config.geoserver.user}:${config.geoserver.password}`)}`,
            },
            body: JSON.stringify(bodyJSON)
        }        
    )
    const text = await response.text();

    if (response.ok) {
        return text;
    } else {
        throw new Error(`postCoverage Error: ${response.status}`);
    }
};

export const updateStyle = async (name:string) => {

}

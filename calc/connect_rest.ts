import fetch from 'node-fetch';
import * as fs from 'fs';
import { createRequire } from 'module';
import { response } from 'express';
const require = createRequire(import.meta.url);
const config = require('./configs/config.json');
const base64 = require('base-64');

const postCoveragestore = async (name: string) => {
    
    const bodyJSON = {
        coverageStore: {
            name: name,
            url: `file:praproSource/mce/${name}.tif`,
            type: "GeoTIFF",
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

    if (response.ok) { return text } 
    else { throw new Error("Estellen fehlgeschlagen") };
};

const postCoverage = async (name: string) => {  
    const u = config.calc.mce + 'test.tif.zip';
    const readStream = fs.createReadStream(u);  
    const url = `${config.geoserver.url}rest/workspaces/${config.geoserver.resultws}/coveragestores/${name}/test.tif`;
    console.log(url);
    const bodyJSON = {
        coverage: {
            "description": "Generated from mce",
            "enabled": true,
            "name": name,
            "title": name
        }
    };

    const response = await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/zip',
                'Authorization': `Basic ${base64.encode(`${config.geoserver.user}:${config.geoserver.password}`)}`
            },
            body: readStream
        }        
    )
    const text = await response.text();

    if (response.ok) {
        return text;
    } else {
        throw new Error(`postCoverage Error: ${response.status}`);
    }

};

const connectrest = (name: string):string => {    
    let out: string = ""
    postCoveragestore(name).then((response) => {
        console.log(response);
        return postCoverage(response);
    }).then((response)=>{
        console.log(response);
        out = response;
    }).catch((e) =>{
        throw e;
    })
    return out;
};

try{
   const test = postCoverage('test');
   console.log(test);
} catch (e){
    console.log(e);
}



export default connectrest;
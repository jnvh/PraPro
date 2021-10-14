import fs from 'fs';
import fetch from 'node-fetch';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);
const base64 = require('base-64');

export interface restConfig{
    method: string, 
    headers?: HeadersInit,
    body?: BodyInit | null | undefined;  
};

export interface wcsParams{
    server: string,
    workspace: string, 
    coverage: string
};

export interface publishParams{
    storeName: string, 
    workspace: string, 
    url: string,
};

const auth = { user: 'admin', pass: 'geoserver' };

const config = (method: string) => ({
    method,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${base64.encode(`${auth.user}:${auth.pass}`)}`,      
    },    
});

const testParams = {
    url: 'http://localhost:8080/geoserver/rest',
    workspace: 'prapro',
    storeName: 'result',
};

const createCoverage = async ({storeName, workspace, url}: publishParams) => {

    const path = 'file:/home/jvanheek/Schreibtisch/PraPro/docker/geoserver/geoserver_data/praproSource/mce/test3.tif';

    //bodyXML.replace(/(\r\n\t|\n|\r\t)/gm,"")
    const bodyXML =     
    `<CoverageStore>
        <name>${storeName}</name>
        <enabled>true</enabled>
        <type>GeoTIFF</type>
        <workspace>${workspace}</workspace>     
        <url>${path}</url>
    </CoverageStore>`;

    
   
    const bodyJSON = {
        "coverageStore": {
              name: "test",
              type: "GeoTIFF",
              workspace: {
                  name:"prapro"
              }
            }
    };
    const bodystring = JSON.stringify(bodyJSON);
    
   // const bodyJSON = `<coverageStore>\n  <name>test</name>\n  <description>Sample ASCII GRID coverage of Global rainfall.</description>\n  <type>GeoTIFF</type>\n  <enabled>true</enabled>\n  <workspace>\n    <name>prapro</name>\n  </workspace>\n  <__default>true</__default>\n  <url>${path}</url>\n</coverageStore>`;
    const options = {        
        method: 'POST',
        headers: {
            'Content-Type': 'application/sjon',
            'Accept': 'application/json',
            'Authorization': `Basic ${base64.encode(`${auth.user}:${auth.pass}`)}`   
        },
        body: bodystring
    };
    console.log(options.body);
    const response = await fetch
        (`${url}/workspaces/prapro/coveragestores`, options);
    const text = await response.text();
    console.log("RESPONSE--------------------------------------------------------------------------------------------------")
    console.log(response);
    console.log("RESPONSE-------------------------------------------------------------------------------------------------");
}; 

    /*

            <url>string</url>
        <coverages>
            <link>null</link>
        </coverages>


    const coverageStore = {
        "coverageStore": {
            "name": storeName,
            "type": "string",
            "enabled": true,
            "workspace": {
                "name": workspace
            }
        }
    };
    
    const configData: restConfig = config('POST');
    configData.body = JSON.stringify(coverageStore);
    const response = await fetch
        (`${url}/workspaces/${workspace}/coveragestores`, configData);
    const text = await response.text();
    if (response.ok) {
        return `Der Coveragestore ${text} wurde erstellt`;
    } else {
        throw new Error(`createCoverage Error: ${response.status}`);
    }
    */

const upGeotiff = async ({url, workspace, storeName}: publishParams) => {

 
    /*
    const coverageDestination = `${url}/workspaces/${workspace}/coveragestores/${storeName}/file.tiff`;
    const stats = fs.statSync(rasterDir);
    const fileSizeInBytes = stats.size;
    const readStream = fs.createReadStream(rasterDir);
    const headers = new Headers();
    headers.append('Content-Type', 'application/zip');
    headers.append('Content-Length', fileSizeInBytes.toString());
    headers.append('Accept', 'application/json');

    const configData = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(readStream),
        AUTH: auth,
    };

    const response = await fetch(coverageDestination, configData);
    const text = await response.text();
    if (response.ok) {
        return `The coverage ${text} has been updated!`;
    } else {
        throw new Error(`upGeotiff Error: ${response.status}`);
    }
    */ 
};

const publishGeotiff = (params: publishParams) => {

    createCoverage(params).then((Response) => {
        console.log(Response);
        upGeotiff(params)
            .then(response => console.log(response))
            .catch(error => console.error(error));
        }
    ).catch(error => console.error(error));
};

export function  connect_rest(name: string):boolean {
    return true;   
}

createCoverage(testParams).catch(
    (err)=>{
        console.log(err);
    }
);

export default connect_rest;
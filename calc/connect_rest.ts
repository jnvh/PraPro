import fs from 'fs';
import fetch from "node-fetch";

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
    rasterDir: string,
};

const auth = { user: 'admin', pass: 'geoserver' };

export const config = (method: string) => ({
    method,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${auth.user}:${auth.pass}`,      
    },    
});

const testParams = {
    url: 'http://localhost:8080/geoserver/rest',
    workspace: 'prapro',
    coveragestore: 'result',
    storeName: 'result',
    rasterDir: './test.zip'
};

export const createCoverage = async ({storeName, workspace, url}: publishParams) => {

    const path = 'file:///Users/Jan/Desktop/rasterTest/test.tif';

    const bodyXML = 
    `
    <CoverageStore>
        <name>${storeName}</name>
        <enabled>true</enabled>
        <type>GeoTIFF</type>
        <workspace>${workspace}</workspace>     
        <url>${path}</url>
    </CoverageStore>`;

    console.log(path);
    const options = {        
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml',
            'Authorization': `Basic ${auth.user}:${auth.pass}`,      
        },
        body: bodyXML.replace(/(\r\n\t|\n|\r\t)/gm,"")
    };
    console.log(options.body);
    const response = await fetch
        (`${url}/workspaces/prapro/coveragestores`, options);
    const text = await response.text();
    if (response.ok) {
        return `Der Coveragestore ${text} wurde erstellt`;
    } else {
        throw new Error(`createCoverage: ${response.status}`);
    }
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

export const upGeotiff = async ({url, workspace, storeName, rasterDir}: publishParams) => {

 
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

export const publishGeotiff = (params: publishParams) => {

    createCoverage(params).then((Response) => {
        console.log(Response);
        upGeotiff(params)
            .then(response => console.log(response))
            .catch(error => console.error(error));
        }
    ).catch(error => console.error(error));
};

createCoverage(testParams).catch(
    (err)=>{
        console.log(err);
    }
);
//publishGeotiff(testParams);
export default publishGeotiff;

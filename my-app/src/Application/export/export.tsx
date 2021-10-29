
import { getCurrentLayerName } from '../mapController/IndikatorGroup'

import { Menu } from 'antd';

export const ExportMenu = (): JSX.Element => {
 
        return (
            <Menu mode="vertical" className={'exportMenu'}>
                <Menu.Item>
                    <a onClick={downloadPNG} >
                        Export as PNG
                    </a>
                </Menu.Item>

                <Menu.Item>
                    <a href={getWCS()} target="_blank" rel="noopener noreferrer">
                        Export as GeoTIFF
                    </a>
                </Menu.Item>
            </Menu>
        )
    }

//Syntax: http://{ geoserver_url }/ows?service=WCS&version={ coverage_version }&request=GetCoverage&coverageId={ layer_name }&format={ output_format }
export function getWCS() {
    const name = getCurrentLayerName();
    return `http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&coverageId=prapro:${name}&format=image/geotiff`
}

export function downloadPNG() {
    
}

export default ExportMenu;
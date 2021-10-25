import './topRight.css';
import { ClipboardData, Download, GeoAltFill, GeoFill, Hexagon, Rulers } from 'react-bootstrap-icons';

import { Button, Space, Tooltip } from 'antd';
import { useMap } from '@terrestris/react-geo';
import {
    moveToGeolocation
}
    from '../mapController/IndikatorGroup';

export const TopRight = (): JSX.Element => {

    return (
        <div className={'topRight'}>
            <Space direction="vertical" size={5}>
                <Tooltip placement="left" title={'Draw Shape'}>
                    <Button icon={<Hexagon />} className={'controlButtonRight'} />
                </Tooltip>
                <Tooltip placement="left" title={'Export'}>
                    <Button icon={<Download />} className={'controlButtonRight'} />
                </Tooltip>
                <Tooltip placement="left" title={'Export'}>
                    <Button icon={<Rulers />} className={'controlButtonRight'} />
                </Tooltip>
                <Tooltip placement="left" title={'Move to location'}>
                    <Button onClick={moveToGeolocation} icon={<GeoAltFill />} className={'controlButtonRight'} />
                </Tooltip>
                <Tooltip placement="left" title={'Set Point of Interest'}>
                    <Button icon={<GeoFill />} className={'controlButtonRight'} />
                </Tooltip>
                <Tooltip placement="left" title={'Get statistics'}>
                    <Button icon={<ClipboardData />} className={'controlButtonRight'} />
                </Tooltip>
            </Space>
        </div>

    )


}

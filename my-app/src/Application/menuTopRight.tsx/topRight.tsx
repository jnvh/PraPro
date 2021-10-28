import './topRight.css';
import { ClipboardData, Download, GeoAltFill, GeoFill, Hexagon, Rulers } from 'react-bootstrap-icons';
import { StatCard } from '../statCard/statCard';
import ExportMenu from '../export/export';
import { Button, Space, Tooltip, Dropdown } from 'antd';
import {
    moveToGeolocation
}
    from '../mapController/IndikatorGroup';
import { useState } from 'react';

export const TopRight = (): JSX.Element => {

    const [showStats, setStats]=useState<boolean>(false);
    const [showExport, setExport]=useState<boolean>(false);
    function toggleStatCard() { setStats(!showStats) };
    function toggleExportMenu() { setExport(!showExport) };

    return (
        <>
        <div className={'topRight'}>
            <Space direction="vertical" size={5}>
                <Tooltip placement="left" title={'Draw Shape'}>
                    <Button icon={<Hexagon />} className={'controlButtonRight'} />
                </Tooltip>
                <Tooltip placement="left" title={'Export'} >
                    <Dropdown overlay={ExportMenu} placement="bottomCenter">
                    <Button icon={<Download />} className={'controlButtonRight'} onClick={toggleExportMenu}/>
                    </Dropdown>
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
                <Tooltip placement="left" title={'Get statistics'} >
                    <Button icon={<ClipboardData />} className={'controlButtonRight'} onClick={toggleStatCard}/>
                </Tooltip>
            </Space>
        </div>
        <StatCard visible={showStats}/>
        </>
    )
}


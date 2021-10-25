import { Menu } from 'antd';
import './menu.css';
import { Infobox } from '../Infobox/infobox';
import React, { useState } from 'react';
import {
    InfoOutlined,
    MinusOutlined,
    PlusOutlined,
    ArrowsAltOutlined,
    AimOutlined
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { useMap } from '@terrestris/react-geo';
import {
    zoomIn,
    zoomOut,
    resetZoom,
    moveToGeolocation
}
    from '../mapController/IndikatorGroup';


export const BottomMenu = (): JSX.Element | null => {

    const map = useMap();

    const [showInfo, setInfo] = useState<boolean>(false);
    const toggleInfo = (): void => {
        setInfo(!showInfo);
    }
        /*
        return (
            <div>
                <Menu className="bottommenu">
                    <Tooltip placement="left" title={'Zoom in'}>
                        <Menu.Item onClick={zoomIn}
                            icon={<PlusOutlined />}>
                        </Menu.Item>
                    </Tooltip>
                    <Tooltip placement="left" title={'Zoom out'}>
                        <Menu.Item onClick={zoomOut}
                            icon={<MinusOutlined />}>
                        </Menu.Item>
                    </Tooltip>
                    <Tooltip placement="left" title={'Reset Zoom'}>
                        <Menu.Item onClick={resetZoom}
                            icon={<ArrowsAltOutlined />}>
                        </Menu.Item>
                    </Tooltip>
                </Menu>
                <Infobox
                    visible={showInfo} />
            </div>

        );
        */

        return (
            <div className={'bottommenu'}>
            <Space direction="vertical" size={3}>
                <Tooltip placement="left" title={'Zoom in'}>
                    <Button onClick={zoomIn} icon={<PlusOutlined /> } className={'controlButton'} />
                </Tooltip>
                <Tooltip placement="left" title={'Zoom out'}>
                    <Button onClick={zoomOut} icon={<MinusOutlined />} className={'controlButton'} />
                </Tooltip>
                <Tooltip placement="left" title={'Reset Zoom'}>
                    <Button onClick={resetZoom} icon={<ArrowsAltOutlined />} className={'controlButton'} />
                </Tooltip>
            </Space>
            </div>

        )
};

export default BottomMenu;

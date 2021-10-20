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
import { Tooltip } from 'antd';
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

    if (true) {
        return (
            <div>
                <Menu className="bottommenu">
                    <Tooltip placement="left" title={'Zeige Info zum Layer'}>
                        <Menu.Item onClick={toggleInfo}
                            icon={<InfoOutlined />}>
                        </Menu.Item>
                    </Tooltip>
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
                    <Tooltip placement="left" title={'Zoome zum aktuellen Standort'}>
                        <Menu.Item onClick={moveToGeolocation}
                            icon={<AimOutlined />}>
                        </Menu.Item>
                    </Tooltip>
                    <Tooltip placement="left" title={'test'}>
                        <Menu.Item>tst</Menu.Item>
                    </Tooltip>
                </Menu>
                <Infobox
                    visible={showInfo} />
            </div>

        );
    }
    return null;
};

export default BottomMenu;

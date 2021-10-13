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
import { Button } from 'antd';
import { useMap } from '@terrestris/react-geo';
import {
    zoomIn, 
    zoomOut,
    resetZoom,
    moveToGeolocation} 
from './../Drawer/IndikatorGroup';


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
                    <Menu.Item onClick={toggleInfo}
                        icon={<InfoOutlined />}>
                    </Menu.Item>
                    <Menu.Item onClick={zoomIn}
                        icon={<PlusOutlined />}>
                    </Menu.Item>
                    <Menu.Item onClick={zoomOut}
                        icon={<MinusOutlined />}>
                    </Menu.Item>
                    <Menu.Item onClick={resetZoom}
                        icon={<ArrowsAltOutlined />}>
                    </Menu.Item>
                    <Menu.Item onClick={moveToGeolocation}
                        icon={<AimOutlined />}>
                    </Menu.Item>
                    <Menu.Item>tst</Menu.Item>
                </Menu>
                <Infobox
                    visible={showInfo} />
            </div>

        );
    }
    return null;
};
/*
export const MenuBotton = () => {
    const [showMenu, setMenu] = useState<boolean>(false);
    const toggleMenu = (): void => {
        setMenu(!showMenu);
    }

    return(
        <div>
            <Button
                type="primary" ghost
                className="menuButtonBottom"
                icon={<ArrowUpOutlined />}
                onClick={toggleMenu}
            />
            <BottomMenu/>
        </div>
    )

}
*/
export default BottomMenu;

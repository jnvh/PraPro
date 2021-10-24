import React, { useState } from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
const { SubMenu } = Menu;

interface DrawButtonProps{
    setType: (type: string)=>void,
    toggle: ()=>void,
    type: string,
}

export const DrawButton = ({setType, type, toggle}:DrawButtonProps): JSX.Element => {
    const drawRectangle = () => {
        setType('Rectangle');
        toggle();
    };
    const drawPolygon = () => {
        setType('Polygon');
        toggle();
    }
    const useView = () => {      
        setType('View');
    };
    const usePoly = () => {
        setType('Polygon');
    }
    const useRect = () => {
        setType('Rectangle');
    }

    const menu = (
        <Menu >
            <Menu.Item key="1" onClick={useView}>
                From View
            </Menu.Item>
            <SubMenu title="From Rectangle" >
                <Menu.Item onClick={useRect}> Most recent</Menu.Item>
                <Menu.Item onClick={drawRectangle}>
                    Draw new rectangle
                </Menu.Item>
            </SubMenu>
            <SubMenu title="From Polygon" >
                <Menu.Item onClick={usePoly}> Most recent</Menu.Item>
                <Menu.Item key="3" onClick={drawPolygon}>
                    Draw new Polygon
                </Menu.Item>
            </SubMenu>
        </Menu>
    );

    return (
        <Dropdown.Button overlay={menu}>
            {type}
        </Dropdown.Button>
    )

};

export default DrawButton;
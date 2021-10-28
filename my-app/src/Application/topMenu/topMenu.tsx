import './topMenu.css';
import { Github,  Info, LayersFill, Search } from 'react-bootstrap-icons';
import { SearchBar } from '../nominatedSearch/searchbar';
import { useMap } from '@terrestris/react-geo';
import { Button, Space, Tooltip } from 'antd';
import { Docs } from '../Dokumentation/docsCrad';
import { useState } from 'react';

export const TopMenu = (): JSX.Element => {
    const map = useMap();
    const [showDocs, setDocs] = useState<boolean>(false);
    const toggleDocs = () =>{
        setDocs(!showDocs);
    }


    const openGit = () => {
        window.open('https://github.com/jnvh/PraPro', '_blank')
    }
    return (
        <div className={'topMenu'}>
            <Space direction="horizontal" size={5}>
                <Tooltip placement="left" title={'Search for Place'}>
                    <Button icon={<Search />} className={'topButton'} />
                </Tooltip>
                <Tooltip placement="left" title={'Switch Overlay'}>
                    <Button icon={<LayersFill />} className={'topButton'} />
                </Tooltip>                
                <Tooltip placement="left" title={'Documentation'}>
                    <Button icon={<Github />} onClick={openGit} className={'topButton'} />
                </Tooltip>
                <Tooltip placement="left" title={'Documentation'}>
                    <Button icon={<Info />} className={'topButton'} onClick={toggleDocs} />
                </Tooltip>
            </Space>
            <Docs visible={showDocs}/>
        </div>    
    )
};

export default TopMenu;
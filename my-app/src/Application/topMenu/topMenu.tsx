import './topMenu.css';
import { Github,  Info, LayersFill, Search } from 'react-bootstrap-icons';
import { SearchBar } from '../nominatedSearch/searchbar';
import { useMap } from '@terrestris/react-geo';
import { Button, Space, Tooltip } from 'antd';

export const TopMenu = (): JSX.Element => {
    const map = useMap();
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
                    <Button icon={<Github />} className={'topButton'} />
                </Tooltip>
                <Tooltip placement="left" title={'Documentation'}>
                    <Button icon={<Info />} className={'topButton'} />
                </Tooltip>
            </Space>
        </div>    
    )
};

export default TopMenu;
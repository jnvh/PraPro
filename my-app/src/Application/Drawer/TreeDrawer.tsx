import { useState } from 'react';

//Antd
import { Drawer, Tooltip } from 'antd';

//Styles
import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';

import {
  UnorderedListOutlined
} from '@ant-design/icons';

//ReactGeo
import {
  SimpleButton,
  useMap
} from '@terrestris/react-geo';

//SRC
import { Tree } from './Tree';
import  config  from '../../configs/config.json';

export const TreeDrawer = (): JSX.Element => {
  const map = useMap();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleDrawer = (): void => {
    setVisible(!visible);
    map.changed();
  }

  return (
    <div className="App">
      <Tooltip placement="bottomRight" title={'Open Drawer'}>
      <SimpleButton
        style={{ 
          position: 'fixed',
          top: '20px', 
          left: '20px',
          width: '40px', 
          height: '40px', 
          backgroundColor: config.style.maincolor, 
          border: config.style.maincolor, 
          boxShadow: config.style.shadow }}
        onClick={toggleDrawer}
        icon={<UnorderedListOutlined />}
      />
      </Tooltip>
      <Drawer
        title="Layerexplorer"
        placement="left"
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
      >
        <Tree
          map={map}
          layerGroup={map.getLayerGroup()}
        />
      </Drawer>
    </div>
  );
};

export default TreeDrawer;

import React, { useState } from 'react';

//Antd
import { Drawer } from 'antd';

//Styles
import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';

import {
  InfoOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

//ReactGeo
import {
  SimpleButton,
  useMap
} from '@terrestris/react-geo';

//SRC
import { Tree } from './Tree';
import { Infobox } from '../Infobox/infobox';

export const TreeDrawer = (): JSX.Element => {
  const map = useMap();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleDrawer = (): void => {
    setVisible(!visible);
    map.changed();
  }

  const [showInfo, setInfo] = useState<boolean>(false);
  const toggleInfo = (): void => {
    setInfo(!showInfo);
  }

  return (
    <div className="App">
      <SimpleButton
        style={{ position: 'fixed', top: '60px', left: '30px' }}
        onClick={toggleDrawer}
        icon={<UnorderedListOutlined />}
      />
      <SimpleButton
        style={{ position: 'fixed', top: '60px', left: '80px' }}
        onClick={toggleInfo}
        icon={<InfoOutlined />}
      />
      <Drawer
        title="Layerexplorer"
        placement="left"
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
        style={{ opacity: 0.8 }}
      >
        <Tree
          map={map}
          layerGroup={map.getLayerGroup()}
        />
      </Drawer>
      <Infobox
        visible={showInfo} />
    </div>
  );
};

export default TreeDrawer;

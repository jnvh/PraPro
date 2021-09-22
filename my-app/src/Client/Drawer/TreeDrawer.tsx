import React, { useState } from 'react';

//Antd
import { Drawer } from 'antd';

//Styles
import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';

//ReactGeo
import {
  SimpleButton,
} from '@terrestris/react-geo';

//SRC
import { Tree } from './Tree';
import {map, layerGroup} from './IndikatorGroup';

export const TreeDrawer = (): JSX.Element => {

  const [visible, setVisible] = useState<boolean>(false);
  const toggleDrawer = () => { setVisible(!visible); }

  return (
    <div className="App">   
   
      <SimpleButton
        style={{ position: 'fixed', top: '30px', right: '30px' }}
        onClick={toggleDrawer}
        iconName="bars"
      />
      <Drawer
        title="Wähle einen Layer aus"
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
        style={{opacity: 0.8}}
      >
        <Tree
          map={map}
          layerGroup={layerGroup} />
      </Drawer>
    </div>
  );
};

export default TreeDrawer;

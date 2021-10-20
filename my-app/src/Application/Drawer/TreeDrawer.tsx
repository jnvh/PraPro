import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './drawer.css'
import React, { useState } from 'react';
import {
  Drawer,
  Tooltip,
  Button,
} from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';
import { useMap } from '@terrestris/react-geo';
import { Tree } from './Tree';
import { AhpDrawer } from '../ahpDrawer/ahpDrawer';

export interface Factor {
  factor: string,
  weight: number
}
export interface MCE {
  factors: Factor[]
}

const starting: MCE = {
  factors: [],
}

export const TreeDrawer = (): JSX.Element => {
  const map = useMap();

  const [mce, setMce] = useState<MCE>({ factors: [] });
  const [visible, setVisible] = useState<boolean>(false);

  const changeFactor = (name: string, change: boolean) => {
    if (change) {
      for(let i = 0;i<mce.factors.length;i++){
        if(mce.factors[i].factor===name){
          return;
        }
      }
      mce.factors.push({ factor: name, weight: 0 });
    } else {
      for (let i = 0; i < mce.factors.length; i++) {
        if (mce.factors[i].factor === name) {
          mce.factors.splice(i, 1);
        }
      }
    }
    const re: MCE = {
      factors: mce.factors
    }
    setMce(re);
  };

  const changeWeight = (name: string, value: number): void => {
    for (let i = 0; i < mce.factors.length; i++) {
      if (mce.factors[i].factor === name) {
        mce.factors[i].weight = value;
        break;
      }
    }
    const re: MCE = {
      factors: mce.factors
    }
    setMce(re);
  }

  
  const toggleDrawer = (): void => {
    setVisible(!visible);
    if (ahp) { toggleAhp() }
    map.changed();
  }

  const [ahp, openAhp] = useState<boolean>(false);
  const toggleAhp = (): void => {
    openAhp(!ahp);
  }

  return (
    <div className="App">
      <Tooltip placement="bottomRight" title={'Open Drawer'}>
        <Button
          className={"openTreeDrawerButton"}
          onClick={toggleDrawer}
          icon={<RightSquareOutlined className={'icon'} />}
        />
      </Tooltip>

      <Drawer
        title="Explorer"
        placement="left"
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
        push={{ distance: 600 }}
        className="treeDrawer"
      >
        <Button
          type="text"
          className="startButton"
          onClick={toggleAhp}>
          Öffne Mce
        </Button>
        <Tree
          map={map}
          layerGroup={map.getLayerGroup()}
          onClick={changeFactor}
        />
        <AhpDrawer
          mce={mce}
          visible={ahp}
          onClose={toggleAhp}
          changeFactor={changeFactor}
          changeWeight={changeWeight}
        />
      </Drawer>

    </div>
  );
};

export default TreeDrawer;

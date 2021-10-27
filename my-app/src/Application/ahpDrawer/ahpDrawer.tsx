import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './../Drawer/drawer.css'
import { MCE } from '../MCE/mce';
import { Drawer, Button, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { PriorisationWrapper } from '../Priorisation/priorisation';
import { useMap } from '@terrestris/react-geo';
import startMce from '../MCE/mce';
import { addResult, getCurrentExtend } from '../mapController/IndikatorGroup'
import DrawButton from '../drawFeatures/drawButton';
import { useState } from 'react';
import { DrawMode } from '../drawFeatures/drawFeatures'

interface AhpDrawerProps {
  visible: boolean;
  mce: MCE,
  onClose: () => void;
  changeFactor: (name: string, change: boolean) => void
  changeWeight: (name: string, weight: number) => void
};

export const showError = () => {
  alert("maybe next time");
}

export const AhpDrawer = ({ mce, visible, onClose, changeFactor, changeWeight }: AhpDrawerProps) => {

  const map = useMap();
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [type, setType] = useState<string>("Pick extend");
  const [extendMem, setExtendMem] = useState<number[][]>([]);
  const refreshMemory = (type: string, ext: number[]) => {
    switch (type) {
      case 'view':
        setExtendMem(extendMem.splice(0, 1, ext));
        break;
      case 'box':
        setExtendMem(extendMem.splice(1, 1, ext));
        break;
      case 'polygon':
        setExtendMem(extendMem.splice(2, 1, ext));
        break;
    }
  }
  const pickType = (type: string) => {
    setType(type);
  };
  const onClick = () => {
    if (mce.extend === undefined || type === 'View') {
      mce.extend = getCurrentExtend();
    }

    startMce(mce).then((result) => {
      if (result && typeof result === 'string') {
        addResult(map, result, mce);
      } else {
        showError();
      }
    })
  };

  const toggleDrawMode = () => {
    onClose();
    setDrawMode(!drawMode);
    if (mce.extend) {
      refreshMemory(type, mce.extend);
    }
  };

  return (
    <div>
      <Drawer
        title="Multi Criteria Evaluation"
        placement="left"
        visible={visible}
        mask={false}
        width={600}
        className={"ahpDrawer"}
        onClose={onClose}
        getContainer={false}
        closeIcon={<LeftOutlined />}
      >

        <div style={{ height: "100px" }}>
          Hier steht was furchtbar intformatives
          <br />
          <Button
            type="text"
            className="startButton">
              Open epxplenation
          </Button>
        </div>
        <PriorisationWrapper
          mce={mce}
          changeFactor={changeFactor}
          changeWeight={changeWeight}
        />
                <Space direction='horizontal' size={10}>
          <Space direction='vertical' size={20}>
        
            <DrawButton setType={pickType} toggle={toggleDrawMode} type={type} />
            <Button onClick={onClick} >
              Start evaluation
            </Button>
          </Space>
        </Space>
      </Drawer>
      <DrawMode
        mce={mce}
        type={type}
        toggle={toggleDrawMode}
        setType={pickType}
        visible={drawMode} />

    </div>

  )
}
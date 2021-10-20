import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './../Drawer/drawer.css'
import { MCE } from '../MCE/mce';
import { Drawer, Button } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { Priorisation, PriorisationWrapper } from '../Priorisation/priorisation'
import startMce from '../MCE/mce';

interface AhpDrawerProps {
  visible: boolean;
  mce:MCE,
  onClose: () => void;
  changeFactor: (name:string, change: boolean)=>void
  changeWeight: (name: string, weight: number)=>void
};

export const AhpDrawer = ({ mce, visible, onClose, changeFactor,changeWeight }: AhpDrawerProps) => {
  const onClick = () =>{
    startMce(mce);
  }

  console.log(mce.factors.length);
    return (
        <Drawer
          title="test"
          placement="left"
          visible={visible}
          mask={false}
          width={600}
          className={"ahpDrawer"}
          onClose={onClose}
          getContainer={false}
          closeIcon={<LeftOutlined />}
        > 
        <div style={{height: "100px"}}>
        Hier steht was furchtbar intformatives
        <br/>
        <Button
          type="text"
          className="startButton">
          Öffne Erklärung
        </Button>
        </div>
          <PriorisationWrapper 
          mce={mce}
          changeFactor={changeFactor}
          changeWeight={changeWeight}
          />

          <Button onClick={onClick} >
            Starte die Berechnung
          </Button>
        </Drawer>

  )
}
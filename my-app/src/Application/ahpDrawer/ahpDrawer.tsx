import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './../Drawer/drawer.css'
import { MCE } from '../MCE/mce';
import { Drawer, Button } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { PriorisationWrapper } from '../Priorisation/priorisation';
import { useMap } from '@terrestris/react-geo';
import startMce from '../MCE/mce';
import { addResult } from '../mapController/IndikatorGroup'
import ZoomToExtent from 'ol/control/ZoomToExtent';

interface AhpDrawerProps {
  visible: boolean;
  mce:MCE,
  onClose: () => void;
  changeFactor: (name:string, change: boolean)=>void
  changeWeight: (name: string, weight: number)=>void
};

export const showError = () =>{
  console.log("maybe next time");
}

export const AhpDrawer = ({ mce, visible, onClose, changeFactor,changeWeight }: AhpDrawerProps) => {
  const map = useMap();
  const onClick = () =>{
    startMce(mce).then((result)=>{
      if(result && typeof result === 'string') {
         addResult(map, result);
        } else {
          showError();
        }
    })
  }

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
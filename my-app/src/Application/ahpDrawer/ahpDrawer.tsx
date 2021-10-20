import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './../Drawer/drawer.css'
import { MCE } from '../MCE/mce';
import { Drawer, Button } from 'antd';
import { Priorisation } from '../Priorisation/priorisation'
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
    return (
        <Drawer
          title="test"
          placement="left"
          visible={visible}
          mask={false}
          width={600}
          className={"ahpDrawer"}
          onClose={onClose}
        >
          {
            mce.factors.map(layer => (
              <Priorisation 
                factor={layer.factor} 
                weight={layer.weight} 
                changeFactor={changeFactor} 
                changeWeight={changeWeight} 
              />
            ))
          }

          <Button onClick={onClick} >
            Starte die Berechnung
          </Button>
        </Drawer>

  )
}
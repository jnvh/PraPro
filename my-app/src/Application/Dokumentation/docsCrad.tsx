import './docs.css';
import { getCurrentLayerName } from '../mapController/IndikatorGroup';
import desc from '../../configs/desc.json';
import { Card } from 'antd';

export interface DocsProps {
    visible: boolean
};

export const Docs = ({visible}:DocsProps) =>{
    if(visible){
    return(
        <Card title="Doumentation" className={'docsCard'}>
            Docoumentetation and Impressum
        </Card>
    )
    } else {return(<div></div>)}
}


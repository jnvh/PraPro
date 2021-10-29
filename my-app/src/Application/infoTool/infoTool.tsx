
import { Card, Table } from 'antd';
import { useState } from 'react';
import { getCurrentLayer, readValueByName } from '../mapController/IndikatorGroup';
import './infoTool.css';
import { MCE } from '../MCE/mce';
import BaseLayer from 'ol/layer/Base';
import { useMap } from '@terrestris/react-geo';


interface InfoCardProps {
    visible: boolean,
}

interface ContentList {
    [key: string]: JSX.Element
};

interface Column {
    title: string,
    dataIndex: string,
    key: string
};

interface Data {
    key: string,
    weight: number,
    factor: string,
    value: number | string,
}

export const InfoCard = ({ visible }: InfoCardProps): JSX.Element => {

    const map = useMap();
    const [coords, setCoords] = useState<number[]>([]);
    const layer = getCurrentLayer();
    map.on('singleclick', function valueListener(event) {
        setCoords(event['coordinate']);   
        
        contructMceTable(layer);     
    });
    console.log(coords);

    const [key, setKey] = useState('general');
    function changeKey(key: string) { setKey(key) };
    const generalStats = (<div>'generel'</div>);

    const tabList = [
        {
            key: 'general',
            tab: 'general'
        },
        {
            key: 'mce',
            tab: 'mce'
        }
    ];

    function contructMceTable(layer: BaseLayer | null) {
        const empty = <div>Nur für Ergebnisse verfügbar</div>;
        if (!layer || !layer.get('mce')) { return empty };
        const mce: MCE = layer.get('mce');

        const data: Data[] = [];
        for (let i = 0; i < mce.factors.length; i++) {
            data.push({
                key: (1 + i).toString(),
                weight: mce.factors[i].weight,
                factor: mce.factors[i].factor,
                value: readValueByName(mce.factors[i].factor, coords)
            });
        };
        const columns = [{}];
        console.log(data);
        //return (<Table dataSource={data} columns={columns} />);
    };
      
    const mceStats = (layer) ? layer.get('mce') : (<div>Nur für Ergebnisse verfügbar</div>);
    
    const contentList: ContentList = {
        genral: generalStats,
        mce: mceStats
    };

    return (
        <Card
            className={'infoCard'}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={k => {
                changeKey(k);
            }
            }
        >
            {contentList[key]}


        </Card>
    );

}
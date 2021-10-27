import './statCard.css';

import { Card, Table, Tooltip } from 'antd';
import {
    getCurrentLayerName }
    from '../mapController/IndikatorGroup';
import { useState } from 'react';
import getRasterStats, { RasterStats } from '../getRasterStats/getRasterStats';
import { useEffect } from 'react';


interface StatCardProps {
    visible: boolean
}
export const StatCard = ({visible}:StatCardProps):JSX.Element =>{
    const layer: string = getCurrentLayerName();
    const [stats, setStats] = useState<RasterStats>()
    console.log(layer);

    useEffect(()=>{
        getRasterStats(layer).then((s)=>{
            console.log(s);

            setStats(s);
        })
     console.log(stats);  
    }, [visible])
 

    if(visible){
    return (
        <Card title="Raster Statistics" className={"mceStats"}>
            Min Value: {stats?.min}
            <br/>
            Max Value: {stats?.max}
            <br/>
            Mean Value: {stats?.mean}
        </Card>
    );
    } else {
        return (
            <div></div>
        )
    }
};
import './statCard.css';

import { Card, Table, Tooltip } from 'antd';
import {
    getCurrentLayerName }
    from '../mapController/IndikatorGroup';
import { useState } from 'react';
import getRasterStats, { RasterStats, Hist } from '../getRasterStats/getRasterStats';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';


interface StatCardProps {
    visible: boolean
}

interface HistogramProps{
    hist: Hist | undefined
}
export const StatCard = ({visible}:StatCardProps):JSX.Element =>{
    const layer: string = getCurrentLayerName();
    const [stats, setStats] = useState<RasterStats>()
    console.log(layer);

    useEffect(()=>{
        getRasterStats(layer).then((s)=>{
            setStats(s);
        })
     console.log(stats);  
    }, [visible]);

    if(visible){
    return (
        <Card title="Raster Statistics" className={"mceStats"}>
            Min Value: {stats?.min}
            <br/>
            Max Value: {stats?.max}
            <br/>
            Mean Value: {stats?.mean}
            <br/>
            <Histogram hist={stats?.histData}/>
        </Card>
    );
    } else {
        return (
            <div></div>
        )
    }
};

interface HistValue{
    x: string, 
    y: number
}

export const Histogram = ({hist}:HistogramProps): JSX.Element => {
    console.log("1111111111")
    const data: HistValue[] = [];
    if(!hist){
        return(<div></div>)
    } else {
        
        const bucketRange = (hist.max - hist.min)/hist.count;
        let xSum = hist.min;
        for(let i = 0; i<hist.buckets.length;i++){
            xSum +=bucketRange;
            const x = xSum.toFixed(2)
            data.push({
                x: x,
                y: hist.buckets[i]
            })
        }
        
        return (        
              <LineChart
                width={500}
                height={300}
                data={data}
                className={'histogram'}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            
          );
    }    
}

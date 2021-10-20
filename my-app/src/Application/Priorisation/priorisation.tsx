import './../../react-geo.css';
import 'antd/dist/antd.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import {
    Slider,
    Row,
    Col,
    Button,
    InputNumber
} from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';
import { useState } from 'react';

interface PrioProps {
    factor: string,
    weight: number,
    changeFactor: (name: string, change: boolean) => void
    changeWeight: (name: string, weight: number) => void
}

export const Priorisation = ({ factor, weight, changeFactor, changeWeight }: PrioProps): JSX.Element => {
    const [value, setValue] = useState<number>(5);
    
    const onChange = (change: number) => {
        setValue(change);
        changeWeight(factor, change);
    }

    const onClick = () => { changeFactor(factor, false); }

    return (
        <Row>
            <Col span={6}>
                {factor}
            </Col>
            <Col span={10}>
                <Slider
                    min={1}
                    max={10}
                    value={value}
                    onChange={onChange}
                    step={0.1}
                />
            </Col>
            <Col>
                <InputNumber
                    min={1}
                    max={20}
                    style={{ margin: '0 16px' }}
                    value={value}
                    onChange={onChange}
                    step={0.1}
                />
            </Col>
            <Col>
                <Button onClick={onClick} icon={<CloseOutlined />} />
            </Col>
        </Row>
    );
};



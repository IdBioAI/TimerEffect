import {type Effect} from "@alfons-app/pdk";
import type {Props} from "./editor";
import { BarChart } from 'react-native-gifted-charts';
import React from "react";

const TimerEffect: Effect<Props> = (props) => {
    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold', color: '#f49090' }}>
                {props.axisY}
            </div>
            
            <BarChart
                key={JSON.stringify(props.dataset)}
                data={props.dataset.map(item => ({
                    value: item.value,
                    label: item.label,
                    frontColor: item.color || '#4285F4'
                }))}
                width={props.width}
                height={props.height}
                yAxisColor="#666"
                xAxisColor="#666"
                yAxisTextStyle={{ color: '#f3a9a9' }}
                xAxisLabelTextStyle={{ color: '#f3a9a9' }}
                showYAxisIndices
                showXAxisIndices
                rotateLabel={props.textRotate}
                spacing={60}
                barWidth={30}
                yAxisLabelWidth={80}
            />

            <div style={{ marginTop: 10, textAlign: 'right', fontSize: 14, fontWeight: 'bold', color: '#f49090' }}>
                {props.axisX}
            </div>
        </div>
    );
};


export default TimerEffect;
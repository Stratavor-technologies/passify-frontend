import React from "react";
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Monday',
        Legend: 100,
        pv: 80,
    },
    {
        name: 'Tuesday',
        Legend: 30,
        pv: 20,
    },
    {
        name: 'Tuesday',
        Legend: 40,
        pv: 30,
    },
    {
        name: 'Tuesday',
        Legend: 30,
        pv: 20,
    },
    {
        name: 'Tuesday',
        Legend: 40,
        pv: 30,
    },
    {
        name: 'Tuesday',
        Legend: 30,
        pv: 20,
    },
    {
        name: 'Tuesday',
        Legend: 40,
        pv: 30,
    },
];

const WaveChart1 = ({

}) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Tooltip />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Legend" stroke="#522CA4" fill="#522CA4" />
                <Area type="monotone" dataKey="pv" stroke="#7249CB" fill="#7249CB" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default WaveChart1;

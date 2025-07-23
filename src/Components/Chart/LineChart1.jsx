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
        name: 'Page A',
        Legend: 40,
        pv: 24,
        amt: 24,
    },
    {
        name: 'Page B',
        Legend: 30,
        pv: 13,
        amt: 22,
    },
    {
        name: 'Page C',
        Legend: 20,
        pv: 40,
        amt: 22,
    },
    {
        name: 'Page D',
        Legend: 27,
        pv: 39,
        amt: 20,
    },
    {
        name: 'Page E',
        Legend: 18,
        pv: 48,
        amt: 21,
    },
    {
        name: 'Page F',
        Legend: 23,
        pv: 38,
        amt: 25,
    },
    {
        name: 'Page G',
        Legend: 34,
        pv: 43,
        amt: 21,
    },
];

const LineChart1 = ({

}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
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
                <Line type="monotone" dataKey="pv" stroke="#ff7300" />

            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default LineChart1;

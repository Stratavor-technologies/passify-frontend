import React from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: '70% Lorem', value: 70 },
    { name: '30% Ipsum', value: 30 },
];

const COLORS = ['#7249CB', '#FFA900'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const PieChart1 = ({

}) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart width={400} height={400}>
                <Tooltip />
                <Legend />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChart1;

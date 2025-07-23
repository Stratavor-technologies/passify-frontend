import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BarChart1 = ({weekGraph}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                width={500}
                height={300}
                data={weekGraph}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickFormatter={(value) => value.toUpperCase()} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="install" fill="#522ca4" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="Un-install" fill="#7249CB" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChart1;   

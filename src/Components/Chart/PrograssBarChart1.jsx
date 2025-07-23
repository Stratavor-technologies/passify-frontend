import React from "react";
import {
    ResponsiveContainer,
} from 'recharts';

const PrograssBarChart1 = ({
    installs,
    uninstalls
}) => {
    return (

        <ResponsiveContainer width="100%" height={200}>
            <div className="mt-4">
                <progress className="progress progress1 w-full" value={installs/10} />
                <p>Installs to Wallet</p>
            </div>
            <div className="mt-4">
                <progress className="progress progress2 w-full" value={uninstalls/10}/>
                <p>Uninstalled from Wallet</p>
            </div>
            {/* <div className="mt-4">
                <progress className="progress progress3 w-full" value={0.6} />
                <p>Consecteuer</p>
            </div> */}
        </ResponsiveContainer>
    );
};

export default PrograssBarChart1;

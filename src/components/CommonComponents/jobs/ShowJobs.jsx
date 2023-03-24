import React from "react";

const Jobs = ({ data }) => {
    return (
        <main>
            <div>
                {data.map((p) => {
                    return (
                        <div key={p._id}>
                            <p>{JSON.stringify(p)}</p>
                            <br />
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default Jobs;

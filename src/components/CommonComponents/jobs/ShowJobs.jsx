import React from "react";

const Jobs = ({ title, data }) => {
    return (
        <main>
            <h1>{title}</h1>
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

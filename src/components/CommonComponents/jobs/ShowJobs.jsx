import React from "react";
import emptyImg from "../../../img/empty.png";

const Jobs = ({ data }) => {
    if (data.length == 0) {
        return (
            <main className="flex flex-col items-center w-full h-full">
                <img className="empty-img" src={emptyImg} alt="." />
                <div>Oops! Nothing to show here...</div>
            </main>
        );
    }
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

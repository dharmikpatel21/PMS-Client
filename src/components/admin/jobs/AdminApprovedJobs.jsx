import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminApprovedJobs = () => {
    const [approvedJobsData, setApprovedJobsData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/admin/fetch/approvedjobs", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                // console.log(res.data);
                setApprovedJobsData(() => {
                    return res.data;
                });
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <main>
            <h1>Approved Jobs</h1>
            <div>
                {approvedJobsData.map((p) => {
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

export default AdminApprovedJobs;

import axios from "axios";
import React, { useState, useEffect } from "react";

const AdminJobApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/admin/fetch/jobapplications", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                // console.log(res.data);
                setJobApplications(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <main>
            <h1>All Job Applications</h1>
            <div>
                {jobApplications.map((p) => {
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

export default AdminJobApplications;

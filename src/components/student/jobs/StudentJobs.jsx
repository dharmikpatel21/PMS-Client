import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowJobs from "../../CommonComponents/jobs/ShowJobs";

const StudentJobs = () => {
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/student/fetch/jobs`, {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                setJobData(() => {
                    return res.data;
                });
            })
            .catch((err) => console.log(err));
    }, []);
    return <ShowJobs title={"All Jobs"} data={jobData} />;
};

export default StudentJobs;

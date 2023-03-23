import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowJobs from "../../CommonComponents/jobs/ShowJobs";

const StudentJobApplications = () => {
    const [jobAppicationData, setJobApplicationData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/student/fetch/appliedjobs", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                setJobApplicationData(() => {
                    return res.data;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <ShowJobs title={"Job Applications"} data={jobAppicationData} />
        </>
    );
};

export default StudentJobApplications;

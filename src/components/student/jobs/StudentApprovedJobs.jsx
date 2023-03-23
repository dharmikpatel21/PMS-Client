import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowJobs from "../../CommonComponents/jobs/ShowJobs";

const StudentApprovedJobs = () => {
    const [jobAppicationData, setJobApplicationData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/student/fetch/approvedjobs", {
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
            <ShowJobs title={"Approved Jobs"} data={jobAppicationData} />
        </>
    );
};

export default StudentApprovedJobs;

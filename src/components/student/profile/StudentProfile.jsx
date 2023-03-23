import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/student/fetch/myprofile", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                setStudentData(() => {
                    return res.data;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main>
            <h1>Student Profile</h1>
            <div>
                <p>{JSON.stringify(studentData)}</p>
            </div>
        </main>
    );
};

export default StudentProfile;

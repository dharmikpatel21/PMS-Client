import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminStudents = () => {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/admin/fetch/students", {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                setStudentData(() => {
                    return res.data;
                });
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <main>
            <h1>Students</h1>
            <div>
                {studentData.map((p) => {
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

export default AdminStudents;

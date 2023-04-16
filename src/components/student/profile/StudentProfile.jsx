import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Loading";

const StudentProfile = () => {
	const [studentData, setStudentData] = useState({});
	const [loading, setLoading] = useState(false);

	const fetchProfileData = () => {
		setLoading(true);
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
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchProfileData();
	}, []);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

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

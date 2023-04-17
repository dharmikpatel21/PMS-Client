import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Loading";
import "../../../css/profile.css";
import student_profile_img from "../../../img/student_profile.jpg";

const StudentProfile = () => {
	const [studentData, setStudentData] = useState({});
	const [loading, setLoading] = useState(false);
	const [updateDetails, setUpdateDetails] = useState(false);

	const handleEdit = () => {};

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
			<div>
				<h1>Student Profile</h1>
				<hr />
				<br />
				<div className="profile-container">
					<div className="student-profile">
						<div className="student-image">
							<img
								className="profile-img"
								src={student_profile_img}
								alt="."
							/>
						</div>
						<h3>{studentData.name}</h3>
					</div>
					<div className="student-info">
						<h3>Student General Information</h3>
						<hr />
						<table>
							<tr>
								<td>Enrollment no</td>
								<td>{studentData.enrollmentNo}</td>
							</tr>
							<tr>
								<td>Name</td>
								<td>{studentData.name}</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>{studentData.email}</td>
							</tr>
							<tr>
								<td>Department</td>
								<td>{studentData.department}</td>
							</tr>
							<tr>
								<td>Division</td>
								<td>{studentData.division}</td>
							</tr>
							<tr>
								<td>CPI</td>
								<td>{studentData.cpi}</td>
							</tr>
						</table>
					</div>
					<div className="other-info active-btn-container">
						<button className="btn-active">Upload Resume</button>
						<button className="btn-active" onClick={handleEdit}>
							Edit
						</button>
					</div>
				</div>
				{/* {updateDetails && (
					<Editdetails
						updateDetails={updateDetails}
						setUpdateDetails={setUpdateDetails}
					/>
				)} */}
			</div>
		</main>
	);
};

export default StudentProfile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Loading from "../../Loading";

// const StudentProfile = () => {
// 	const [studentData, setStudentData] = useState({});
// 	const [loading, setLoading] = useState(false);

// 	const fetchProfileData = () => {
// 		setLoading(true);
// 		axios
// 			.get("http://localhost:5001/api/student/fetch/myprofile", {
// 				headers: {
// 					"auth-token": sessionStorage.getItem("auth-token"),
// 				},
// 			})
// 			.then((res) => {
// 				setStudentData(() => {
// 					return res.data;
// 				});
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});
// 	};

// 	useEffect(() => {
// 		fetchProfileData();
// 	}, []);

// 	if (loading)
// 		return (
// 			<main>
// 				<Loading />
// 			</main>
// 		);

// 	return (
// 		<main>
// 			<h1>Student Profile</h1>
// 			<div>
// 				<p>{JSON.stringify(studentData)}</p>
// 			</div>
// 		</main>
// 	);
// };

// export default StudentProfile;

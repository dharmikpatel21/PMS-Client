import React, { useEffect, useState } from "react";
import Loading from "../../Loading";
import "../../../css/profile.css";
import student_profile_img from "../../../img/student_profile.jpg";
import axios from "axios";

const StudentProfile = ({ profileData, setShowProfile }) => {
	const [studentData, setStudentData] = useState({});
	const [loading, setLoading] = useState(false);
	const handleCancel = () => {
		setShowProfile(false);
	};

	const fetchCurrentStudentData = (email) => {
		setLoading(true);
		axios
			.get(
				`http://localhost:5001/api/admin/fetch/students/email/${email}`,
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
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
		fetchCurrentStudentData(profileData);
	}, []);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	return (
		<main>
			<div className="edit-form-container-wrapper">
				<span className="edit-form-cancel-btn" onClick={handleCancel}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</span>
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
								<tbody>
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
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default StudentProfile;

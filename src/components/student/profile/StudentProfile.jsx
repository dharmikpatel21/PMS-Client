import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Loading";
import "../../../css/profile.css";
import student_profile_img from "../../../img/student_profile.jpg";
import StudentEditProfile from "./StudentEditProfile";
import StudentUploadResume from "./StudentUploadResume";

const StudentProfile = () => {
	const [studentData, setStudentData] = useState({});
	const [loading, setLoading] = useState(false);
	const [updateDetails, setUpdateDetails] = useState();
	const [resumeFile, setResumeFile] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);
	const [showUploadResumeForm, setShowUploadResumeForm] = useState(false);

	const handleEdit = (id) => {
		console.log(id);
		setUpdateDetails(id);
		setShowEditForm(true);
	};

	const handleUploadResume = () => {
		setShowUploadResumeForm(true);
	};

	const fetchProfileData = () => {
		setLoading(true);
		axios
			.get("/api/student/fetch/myprofile", {
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

	const updateProfileData = (id, { password }) => {
		setLoading(true);
		let data = {
			password,
		};
		if (!password || password === "") {
			delete data.password;
		}
		console.log(data);
		axios
			.post(
				`/api/student/profile/${id}`,
				{ data },
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				window.alert(res.data.msg);
				fetchProfileData();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const uploadResume = () => {
		if (!resumeFile || resumeFile === "")
			return window.alert("Please Upload your Resume");
		console.log(resumeFile.name);
		if (resumeFile.name !== `${studentData.enrollmentNo}.pdf`) {
			return window.alert(
				"Please Rename Your resume with your enrollment no and upload again!"
			);
		}
		console.log(resumeFile.name);
		axios
			.post(
				`/api/student/upload/resume/${studentData._id}`,
				{ myFile: resumeFile },
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((res) => {
				window.alert(res.data.msg);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {});
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
			{showEditForm ? (
				<StudentEditProfile
					setShowEditForm={setShowEditForm}
					updateDetails={updateDetails}
					updateProfileData={updateProfileData}
					studentData={studentData}
				/>
			) : (
				<></>
			)}
			{showUploadResumeForm ? (
				<StudentUploadResume
					setShowUploadResumeForm={setShowUploadResumeForm}
					setResumeFile={setResumeFile}
					resumeFile={resumeFile}
					uploadResume={uploadResume}
				/>
			) : (
				<></>
			)}
			<div className="profile-container-wrapper">
				<h1 data-aos="zoom-in">Student Profile</h1>
				<hr />
				<br />
				<div className="profile-container">
					<div
						className="student-profile"
						data-aos="fade-right"
						data-aos-duration="400"
					>
						<div className="student-image">
							<img
								className="profile-img"
								src={student_profile_img}
								alt="."
								data-aos="fade-right"
							/>
						</div>
						<h3 data-aos="fade-right" data-aos-delay="200">
							{studentData.name}
						</h3>
					</div>
					<div
						className="student-info"
						data-aos="fade-left"
						data-aos-duration="400"
						data-aos-delay="100"
					>
						<h3 data-aos="fade-down">
							Student General Information
						</h3>
						<hr />
						<table>
							<tbody>
								<tr data-aos="fade-left">
									<td>Enrollment no</td>
									<td>{studentData.enrollmentNo}</td>
								</tr>
								<tr data-aos="fade-left" data-aos-delay="100">
									<td>Name</td>
									<td>{studentData.name}</td>
								</tr>
								<tr data-aos="fade-left" data-aos-delay="200">
									<td>Email</td>
									<td>{studentData.email}</td>
								</tr>
								<tr data-aos="fade-left" data-aos-delay="300">
									<td>Department</td>
									<td>{studentData.department}</td>
								</tr>
								<tr data-aos="fade-left" data-aos-delay="400">
									<td>Division</td>
									<td>{studentData.division}</td>
								</tr>
								<tr data-aos="fade-left" data-aos-delay="500">
									<td>CPI</td>
									<td>{studentData.cpi}</td>
								</tr>
								{studentData.resumeLink ? (
									<>
										<tr
											data-aos="fade-left"
											data-aos-delay="600"
										>
											<td>Resume</td>
											<td>
												<a
													style={{
														color: "var(--primary-color)",
													}}
													href={
														"http://localhost:5001/" +
														studentData.resumeLink
													}
													target="_blank"
												>
													View Resume
												</a>
											</td>
										</tr>
									</>
								) : (
									<></>
								)}
							</tbody>
						</table>
					</div>
					<div
						className="other-info active-btn-container"
						data-aos="fade-up"
						data-aos-offset="-500"
					>
						<button
							className="btn-active"
							value={studentData._id}
							onClick={handleUploadResume}
						>
							Upload Resume
						</button>
						<button
							className="btn-active"
							value={studentData._id}
							onClick={(e) => handleEdit(e.target.value)}
						>
							Update Password
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default StudentProfile;

import React, { useState } from "react";
import axios from "axios";
import "../../../css/form.css";

const AddStudent = () => {
	const [enrollmentNo, setEnrollmentNo] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [department, setDepartment] = useState("");
	const [division, setDivision] = useState("");
	const [cpi, setCpi] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(enrollmentNo, name, email, department, division, cpi);
		if (
			!enrollmentNo ||
			!email ||
			!name ||
			!cpi ||
			department === "" ||
			division === ""
		)
			return window.alert("No empty field accepted");
		axios
			.post(
				"http://localhost:5001/api/admin/add/student",
				{ enrollmentNo, name, email, department, division, cpi },
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				// console.log(res.data);
				window.alert(res.data.msg);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<main>
			<div className="form-container-wrapper">
				<div className="form-container">
					<div className="title">Add Student</div>
					<form>
						<div className="details">
							<div className="input-box input-box-50">
								<span className="input-label">
									Enrollment No
								</span>
								<input
									type="text"
									placeholder="Enter Enrollment No"
									value={enrollmentNo}
									onChange={(e) =>
										setEnrollmentNo(e.target.value)
									}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Name</span>
								<input
									type="text"
									placeholder="Enter Student Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Email</span>
								<input
									type="email"
									placeholder="Enter Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Department</span>
								<select
									name="department"
									id=""
									value={department}
									onChange={(e) => {
										setDepartment(e.target.value);
										console.log(e.target.value);
									}}
								>
									<option value="" disabled>
										Select Department
									</option>
									<option value="C.E.">C.E.</option>
									<option value="I.T">I.T.</option>
									<option value="M.E.">M.E.</option>
									<option value="Civil">Civil</option>
								</select>
							</div>
							<div className="input-box input-box-50">
								<span className="division">Division</span>
								<select
									name="division"
									value={division}
									onChange={(e) => {
										setDivision(e.target.value);
									}}
								>
									<option value="" disabled>
										Select Division
									</option>
									<option value="B">B</option>
									<option value="D">D</option>
									<option value="E">E</option>
									<option value="b*">b*</option>
									<option value="i">i</option>
									<option value="j">j</option>
								</select>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Cpi</span>
								<input
									type="number"
									placeholder="Enter Cpi"
									step="0.01"
									value={cpi}
									onChange={(e) => setCpi(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="button">
							<button className="form-btn" onClick={handleSubmit}>
								Add Student
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default AddStudent;

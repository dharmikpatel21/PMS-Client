import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading";
import "../../../css/form.css";

const EditStudent = ({ editStudent, setShowEditForm, updateStudent }) => {
	const [enrollmentNo, setEnrollmentNo] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [department, setDepartment] = useState("");
	const [division, setDivision] = useState("");
	const [cpi, setCpi] = useState("");

	const [loading, setLoading] = useState(false);

	const handleCancel = () => {
		setShowEditForm(false);
	};

	const fetchCurrentStudentData = (id) => {
		if (!id || id === "") return;
		setLoading(true);
		axios
			.get(`http://localhost:5001/api/admin/fetch/students/${id}`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setEnrollmentNo(res.data.enrollmentNo);
				setName(res.data.name);
				setEmail(res.data.email);
				setDepartment(res.data.department);
				setDivision(res.data.division);
				setCpi(res.data.cpi);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
				// console.log(
				// 	enrollmentNo,
				// 	email,
				// 	name,
				// 	cpi,
				// 	division,
				// 	department
				// );
			});
	};

	const handleEdit = (e) => {
		// console.log(
		// 	"edit",
		// 	enrollmentNo,
		// 	email,
		// 	name,
		// 	cpi,
		// 	division,
		// 	department
		// );
		e.preventDefault();
		if (
			!name ||
			!department ||
			!division ||
			!cpi ||
			name === "" ||
			department === "" ||
			division === "" ||
			cpi === ""
		)
			return window.alert("No empty field accepted");

		updateStudent(editStudent, {
			name,
			department,
			division,
			cpi,
		});

		setEnrollmentNo("");
		setName("");
		setEmail("");
		setDepartment("");
		setDivision("");
		setCpi("");
	};

	useEffect(() => {
		fetchCurrentStudentData(editStudent);
	}, []);
	useEffect(() => {}, [loading]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);
	return (
		<main>
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
			<div className="edit-form-container-wrapper" data-aos="zoom-in">
				<div className="form-container">
					<div className="title">Update Student</div>
					<form>
						<div className="details">
							<div className="input-box input-box-50">
								<span className="input-label">
									Enrollment No
								</span>
								<input
									type="text"
									placeholder={enrollmentNo}
									disabled
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Email</span>
								<input
									type="email"
									placeholder={email}
									disabled
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
							<button className="form-btn" onClick={handleEdit}>
								Update Student
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default EditStudent;

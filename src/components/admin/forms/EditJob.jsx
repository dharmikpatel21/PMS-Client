import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading";
import "../../../css/form.css";

const EditJob = ({ editJob, setShowEditForm, updateJob }) => {
	const [companyName, setCompanyName] = useState();
	const [email, setEmail] = useState();
	const [location, setLocation] = useState();
	const [jobTitle, setJobTitle] = useState();
	const [jobDescription, setJobDescription] = useState();
	const [hiringStatus, setHiringStatus] = useState();

	const [loading, setLoading] = useState(false);

	const handleCancel = () => {
		setShowEditForm(false);
	};

	const fetchCurrentJobData = (id) => {
		if (!id || id === "") return;
		setLoading(true);
		axios
			.get(`/api/admin/fetch/jobs/${id}`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setCompanyName(res.data.name);
				setEmail(res.data.email);
				setLocation(res.data.location);
				setJobTitle(res.data.jobTitle);
				setJobDescription(res.data.jobDescription);
				setHiringStatus(res.data.hiringStatus);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};

	const handleEdit = (e) => {
		e.preventDefault();
		if (
			!companyName ||
			!email ||
			!location ||
			!jobTitle ||
			!jobDescription ||
			hiringStatus == null ||
			companyName === "" ||
			email === "" ||
			location === "" ||
			jobTitle === "" ||
			jobDescription === ""
		)
			return window.alert("No empty field accepted");

		updateJob(editJob, {
			companyName,
			email,
			location,
			jobTitle,
			jobDescription,
			hiringStatus,
		});

		setCompanyName("");
		setEmail("");
		setLocation("");
		setJobTitle("");
		setJobDescription("");
		setHiringStatus("");
	};

	useEffect(() => {
		fetchCurrentJobData(editJob);
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
					<div className="title">Update Job</div>
					<form>
						<div className="details">
							<div className="input-box input-box-50">
								<span className="input-label">
									Company Name
								</span>
								<input
									type="text"
									placeholder="Enter Company Name"
									value={companyName}
									onChange={(e) =>
										setCompanyName(e.target.value)
									}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Email</span>
								<input
									type="email"
									placeholder="Enter Company Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Location</span>
								<input
									type="text"
									placeholder="Enter Job Company Location"
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">Job Title</span>
								<input
									type="text"
									placeholder="Enter Job Title"
									value={jobTitle}
									onChange={(e) => {
										setJobTitle(e.target.value);
									}}
									required
								/>
							</div>
							<div className="input-box input-box-100">
								<span className="input-label">
									Job Description
								</span>
								<input
									type="text"
									placeholder="Enter Job Description"
									value={jobDescription}
									onChange={(e) => {
										setJobDescription(e.target.value);
									}}
									required
								/>
							</div>
						</div>
						<div className="flex gap-0 items-center input-box-100">
							<span className="input-label">Hiring Status</span>
							<div className="radio-group-container">
								<span className="input-label">Open</span>
								<input
									className="input-radiobutton"
									type="radio"
									name="hiringStatus"
									checked={hiringStatus}
									onChange={(e) => {
										setHiringStatus(true);
									}}
								/>
								<span className="input-label">Closed</span>
								<input
									className="input-radiobutton"
									type="radio"
									name="hiringStatus"
									checked={!hiringStatus}
									onChange={(e) => {
										setHiringStatus(false);
									}}
								/>
							</div>
						</div>
						<div className="button">
							<button className="form-btn" onClick={handleEdit}>
								Update Job
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default EditJob;

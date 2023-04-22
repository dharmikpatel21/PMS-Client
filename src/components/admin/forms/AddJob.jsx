import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading";
import "../../../css/form.css";

const AddJob = () => {
	const [companyName, setCompanyName] = useState();
	const [email, setEmail] = useState();
	const [location, setLocation] = useState();
	const [jobTitle, setJobTitle] = useState();
	const [jobDescription, setJobDescription] = useState();
	const [hiringStatus, setHiringStatus] = useState();

	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!companyName ||
			!email ||
			!location ||
			!jobTitle ||
			!jobDescription ||
			hiringStatus == null
		)
			return window.alert("No empty field accepted");

		setLoading(true);
		axios
			.post(
				"/api/admin/add/job",
				{
					companyName,
					email,
					location,
					jobTitle,
					jobDescription,
					hiringStatus,
				},
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
			})
			.finally(() => {
				setLoading(false);
			});
		setCompanyName("");
		setEmail("");
		setLocation("");
		setJobTitle("");
		setJobDescription("");
		setHiringStatus("");
	};

	useEffect(() => {}, [loading]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);
	return (
		<main>
			<div className="form-container-wrapper">
				<div className="form-container" data-aos="zoom-in">
					<div className="title">Add Job</div>
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
									onChange={(e) => {
										setHiringStatus(true);
										console.log("true");
									}}
								/>
								<span className="input-label">Closed</span>
								<input
									className="input-radiobutton"
									type="radio"
									name="hiringStatus"
									onChange={(e) => {
										setHiringStatus(false);
										console.log("false");
									}}
								/>
							</div>
						</div>
						<div className="button">
							<button className="form-btn" onClick={handleSubmit}>
								Add Job
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default AddJob;

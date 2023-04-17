import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminShowJobs from "./AdminShowJobs";
import "../../../css/search.css";
import Loading from "../../Loading";
import EditJob from "../forms/EditJob";

const AdminJobs = () => {
	const [jobData, setJobData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [removeJob, setRemoveJob] = useState("");
	const [editJob, setEditJob] = useState("");
	const [showEditForm, setShowEditForm] = useState(false);

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}
	const fetchData = () => {
		setLoading(true);
		axios
			.get(`http://localhost:5001/api/admin/fetch/jobs`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setJobData(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};
	const searchData = () => {
		setLoading(true);
		axios
			.post(
				`http://localhost:5001/api/admin/fetch/jobs`,
				{
					query: searchBoxData,
				},
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				setJobData(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};
	const removeData = (_id) => {
		if (_id === "" || !_id) return;
		setLoading(true);
		axios
			.delete(`http://localhost:5001/api/admin/fetch/jobs/${_id}`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				window.alert("Record deleted...");
				fetchData();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};
	const updateJob = (id, data) => {
		if (!id || id === "") return;
		axios
			.post(
				`http://localhost:5001/api/admin/update/job/${id}`,
				{
					companyName: data.companyName,
					email: data.email,
					location: data.location,
					jobTitle: data.jobTitle,
					jobDescription: data.jobDescription,
					hiringStatus: data.hiringStatus,
				},
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				setShowEditForm(false);
				fetchData();
				window.alert(res.data.msg);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setEditJob("");
			});
	};

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		searchData();
	}, [search]);
	useEffect(() => {
		removeData(removeJob);
	}, [removeJob]);

	useEffect(() => {}, [jobData, showEditForm]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	return (
		<>
			<main>
				{showEditForm ? (
					<EditJob
						editJob={editJob}
						updateJob={updateJob}
						setShowEditForm={setShowEditForm}
					/>
				) : (
					<></>
				)}
				<>
					<div className="search-area flex justify-between items-center">
						<h1>All Jobs</h1>
						<div className="search-wrapper flex gap-0">
							<input
								className="search-box"
								type="text"
								placeholder="Search"
								onChange={(e) =>
									setSearchBoxData(e.target.value)
								}
							/>
							<button
								className="search-button flex items-center justify-center svg-wrapper"
								onClick={handleSearch}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
							</button>
						</div>
					</div>
					<AdminShowJobs
						data={jobData}
						setRemoveJob={setRemoveJob}
						setEditJob={setEditJob}
						setShowEditForm={setShowEditForm}
					/>
				</>
			</main>
		</>
	);
};

export default AdminJobs;

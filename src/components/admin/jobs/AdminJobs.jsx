import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminShowJobs from "./AdminShowJobs";
import "../../../css/search.css";
import Loading from "../../Loading";

const AdminJobs = () => {
	const [jobData, setJobData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [removeJob, setRemoveJob] = useState("");
	const [editJob, setEditJob] = useState();

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
			.catch((err) => console.log(err));
		setLoading(false);
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
			.catch((err) => console.log(err));
		setLoading(false);
	};
	const removeData = (_id) => {
		if (_id === "" || !_id) return;
		axios
			.delete(`http://localhost:5001/api/admin/fetch/jobs/${_id}`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				window.alert("Record deleted...");
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		searchData();
	}, [search]);
	useEffect(() => {
		removeData(removeJob);
		fetchData();
	}, [removeJob]);

	useEffect(() => {}, [jobData]);

	return (
		<main>
			{loading ? (
				<Loading />
			) : (
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
					/>
				</>
			)}
		</main>
	);
};

export default AdminJobs;

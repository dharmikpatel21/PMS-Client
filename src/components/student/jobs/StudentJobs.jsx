import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentShowJobs from "./StudentShowJobs";
import Loading from "../../Loading";
import NoData from "../../NoData";

const StudentJobs = () => {
	const [jobData, setJobData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [applyJob, setApplyJob] = useState("");

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}

	const fetchData = async () => {
		setLoading(true);
		await axios
			.get(`/api/student/fetch/jobs`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then(async (res) => {
				const approvedJobs = res.data.approvedJobs;
				const appliedJobs = res.data.appliedJobs;
				const jobs = res.data.jobs;
				const removeApprovedJobs = await jobs.filter((obj) => {
					let flag = true;
					approvedJobs.forEach(function (itemObj) {
						if (obj._id === itemObj.jobId) {
							flag = false;
						}
					});
					return flag;
				});
				const removeAppliedJobs = await removeApprovedJobs.filter(
					(obj) => {
						let flag = true;
						appliedJobs.forEach(function (itemObj) {
							if (obj._id === itemObj.jobId) {
								flag = false;
							}
						});
						return flag;
					}
				);
				await setJobData(() => {
					return removeAppliedJobs;
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
				`/api/student/fetch/jobs`,
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
	const applyForJob = (id) => {
		axios
			.post(
				"/api/student/apply",
				{ jobId: id },
				{
					headers: {
						"auth-token": sessionStorage.getItem("auth-token"),
					},
				}
			)
			.then((res) => {
				window.alert(res.data.msg);
			})
			.catch((err) => {});
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if ((!searchBoxData, searchBoxData === "")) return;
		searchData();
	}, [search]);
	useEffect(() => {
		if (!applyJob || applyJob === "") return;
		applyForJob(applyJob);
	}, [applyJob]);
	// useEffect(() => {}, [jobData]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);
	if (jobData.length === 0) {
		return <NoData title={"All Jobs"} />;
	}
	return (
		<>
			<div
				className="search-area flex justify-between items-center"
				data-aos="fade-down"
			>
				<h1>All Jobs</h1>
				<div className="search-wrapper flex gap-0">
					<input
						className="search-box"
						type="text"
						placeholder="Search"
						onChange={(e) => setSearchBoxData(e.target.value)}
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
			<StudentShowJobs
				data={jobData}
				applyBtn={true}
				setApplyJob={setApplyJob}
			/>
		</>
	);
};

export default StudentJobs;

import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentShowJobs from "./StudentShowJobs";

const StudentJobApplications = () => {
	const [jobAppicationData, setJobApplicationData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}
	useEffect(() => {
		axios
			.get("http://localhost:5001/api/student/fetch/appliedjobs", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setJobApplicationData(() => {
					return res.data;
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.post(
				`http://localhost:5001/api/student/fetch/appliedjobs`,
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
				setJobApplicationData(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err));
	}, [search]);
	useEffect(() => {}, [jobAppicationData]);

	return (
		<>
			<div className="search-area flex justify-between items-center">
				<h1>Job Applications</h1>
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
			<StudentShowJobs data={jobAppicationData} />
		</>
	);
};

export default StudentJobApplications;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminShowJobsStudent from "./AdminShowJobsStudent";
import Loading from "../../Loading";

const AdminApprovedJobs = () => {
	const [approvedJobsData, setApprovedJobsData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}

	const fetchApprovedJobData = () => {
		setLoading(true);
		axios
			.get("http://localhost:5001/api/admin/fetch/approvedjobs", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				// console.log(res.data);
				setApprovedJobsData(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};

	const searchApprovedJobData = () => {
		setLoading(true);
		axios
			.post(
				`http://localhost:5001/api/admin/fetch/approvedjobs`,
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
				setApprovedJobsData(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchApprovedJobData();
	}, []);

	useEffect(() => {
		searchApprovedJobData();
	}, [search]);

	useEffect(() => {}, [approvedJobsData]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	return (
		<main>
			<div className="search-area flex justify-between items-center">
				<h1>Approved Jobs</h1>
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
			<AdminShowJobsStudent data={approvedJobsData} approveBtn={false} />
		</main>
	);
};

export default AdminApprovedJobs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Loading";
import NoData from "../../NoData";

const AdminStudents = () => {
	const [studentData, setStudentData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [removeStudent, setRemoveStudent] = useState();

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}
	const handleEdit = (_id) => {
		console.log("Edit: " + _id);
	};
	const handleRemove = (_id) => {
		const ans = window.confirm("Are you sure to delete record?");
		if (ans === 0) {
			return;
		}
		setRemoveStudent(_id);
	};

	const fetchData = () => {
		setLoading(true);
		axios
			.get("http://localhost:5001/api/admin/fetch/students", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setStudentData(() => {
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
		axios
			.delete(`http://localhost:5001/api/admin/fetch/students/${_id}`, {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				window.alert("Record deleted...");
			})
			.catch((err) => console.log(err));
	};

	const searchData = () => {
		setLoading(true);
		axios
			.post(
				`http://localhost:5001/api/admin/fetch/students`,
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
				setStudentData(() => {
					return res.data;
				});
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		searchData();
	}, [search]);
	useEffect(() => {
		removeData(removeStudent);
		fetchData();
	}, [removeStudent]);

	useEffect(() => {}, [studentData]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	return (
		<main>
			<>
				<div className="search-area flex justify-between items-center">
					<h1>Students</h1>
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
				<>
					{studentData.length === 0 ? (
						<NoData />
					) : (
						<div className="student-card-container">
							{studentData.map((p) => {
								return (
									<div key={p._id} className="student-card">
										<div className="row">
											<span>Enrollment No:</span>
											<span>{p.enrollmentNo}</span>
										</div>
										<div className="row">
											<span>Name:</span>
											<span>{p.name}</span>
										</div>
										<div className="row">
											<span>Email:</span>
											<span>{p.email}</span>
										</div>
										<div className="row">
											<span>Department:</span>
											<span>{p.department}</span>
										</div>
										<div className="row">
											<span>Division:</span>
											<span>{p.division}</span>
										</div>
										<div className="row">
											<span>CPI:</span>
											<span>{p.cpi}</span>
										</div>

										{/* buttons */}
										<div className="active-btn-container">
											<button
												className="btn active-btn"
												value={p._id}
												onClick={(e) =>
													handleEdit(e.target.value)
												}
											>
												Edit
											</button>
											<button
												className="btn red-btn"
												value={p._id}
												onClick={(e) =>
													handleRemove(e.target.value)
												}
											>
												Remove
											</button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</>
			</>
		</main>
	);
};

export default AdminStudents;

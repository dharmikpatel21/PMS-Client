import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Loading";
import NoData from "../../NoData";
import EditStudent from "../forms/EditStudent";

const AdminStudents = () => {
	const [studentData, setStudentData] = useState([]);
	const [searchBoxData, setSearchBoxData] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [removeStudent, setRemoveStudent] = useState("");
	const [editStudent, setEditStudent] = useState("");
	const [showEditForm, setShowEditForm] = useState(false);

	function handleSearch() {
		if (searchBoxData !== "") {
			setSearch(searchBoxData);
			console.log(searchBoxData);
		}
	}
	const handleEdit = (_id) => {
		// console.log("Edit: " + _id);
		setEditStudent(_id);
		setShowEditForm(true);
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
				fetchData();
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
	const updateStudent = (id, data) => {
		if (!id || id === "") return;
		axios
			.post(
				`http://localhost:5001/api/admin/update/student/${id}`,
				{
					name: data.name,
					department: data.department,
					division: data.division,
					cpi: data.cpi,
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
				setEditStudent("");
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
	}, [removeStudent]);

	useEffect(() => {}, [studentData, loading]);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	return (
		<main>
			<>
				{showEditForm ? (
					<EditStudent
						editStudent={editStudent}
						updateStudent={updateStudent}
						setShowEditForm={setShowEditForm}
					/>
				) : (
					<></>
				)}
				<div
					className="search-area flex justify-between items-center"
					data-aos="fade-down"
				>
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
									<div
										key={p._id}
										className="student-card"
										data-aos="fade-left"
									>
										<div
											className="row"
											data-aos="fade-left"
										>
											<span>Enrollment No:</span>
											<span>{p.enrollmentNo}</span>
										</div>
										<div
											className="row"
											data-aos="fade-left"
											data-aos-delay="100"
										>
											<span>Name:</span>
											<span>{p.name}</span>
										</div>
										<div
											className="row"
											data-aos="fade-left"
											data-aos-delay="200"
										>
											<span>Email:</span>
											<span>{p.email}</span>
										</div>
										<div
											className="row"
											data-aos="fade-left"
											data-aos-delay="300"
										>
											<span>Department:</span>
											<span>{p.department}</span>
										</div>
										<div
											className="row"
											data-aos="fade-left"
											data-aos-delay="400"
										>
											<span>Division:</span>
											<span>{p.division}</span>
										</div>
										<div
											className="row"
											data-aos="fade-left"
											data-aos-delay="500"
										>
											<span>CPI:</span>
											<span>{p.cpi}</span>
										</div>

										{/* buttons */}
										<div
											className="active-btn-container"
											data-aos="fade-up"
											data-aos-offset="-500"
										>
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

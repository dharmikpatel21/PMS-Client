import React, { useState, useEffect } from "react";
import DashboardCard from "../../CommonComponents/dashboard/DashboardCard";
import DashTable from "../../CommonComponents/dashboard/DashTable";
import axios from "axios";
import "../../../css/dashboard.css";
import Loading from "../../Loading";

const StudentDashboard = () => {
	const [dashData, setDashData] = useState([]);
	const [jobData, setJobData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchDashboardData = () => {
		setLoading(true);
		axios
			.get("/api/student/fetch/dashboard", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setDashData(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const fetchJobData = () => {
		setLoading(true);
		axios
			.get("/api/student/fetch/jobs", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				// console.log(res.data);
				setJobData(() => {
					return res.data.jobs;
				});
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				// setLoading(false);
			});
	};
	useEffect(() => {
		fetchDashboardData();
		fetchJobData();
	}, []);

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	return (
		<main>
			<div className="card-container" data-aos="fade-down">
				{dashData.map((data) => (
					<DashboardCard
						key={data._id}
						label={data.label}
						value={data.value}
					/>
				))}
			</div>

			<div className="dashboard-table-grid" data-aos="fade-up">
				<DashTable
					title={"Available Jobs"}
					data={jobData}
					link={"/student/jobs"}
				/>
			</div>
		</main>
	);
};

export default StudentDashboard;

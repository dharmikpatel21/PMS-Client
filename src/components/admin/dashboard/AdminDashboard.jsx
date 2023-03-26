import React, { useState, useEffect } from "react";
import DashboardCard from "../../CommonComponents/dashboard/DashboardCard";
import DashTable from "../../CommonComponents/dashboard/DashTable";
import axios from "axios";
import "../../../css/dashboard.css";
import Loading from "../../Loading";

const AdminDashboard = () => {
	const [dashData, setDashData] = useState([]);
	const [jobData, setJobData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchDashboardData = () => {
		axios
			.get("http://localhost:5001/api/admin/fetch/dashboard", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				setDashData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchJobData = () => {
		axios
			.get("http://localhost:5001/api/admin/fetch/jobs", {
				headers: {
					"auth-token": sessionStorage.getItem("auth-token"),
				},
			})
			.then((res) => {
				// console.log(res.data);
				setJobData(() => {
					return res.data;
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		setLoading(true);
		fetchDashboardData();
		fetchJobData();
		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<main>
					<div className="card-container">
						{dashData.map((data) => (
							<DashboardCard
								key={data._id}
								label={data.label}
								value={data.value}
							/>
						))}
					</div>

					<div className="dashboard-table-grid">
						<DashTable
							title={"Jobs"}
							data={jobData}
							link={"/admin/jobs"}
						/>
					</div>
				</main>
			)}
		</>
	);
};

export default AdminDashboard;

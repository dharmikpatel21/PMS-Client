import React from "react";
import NoData from "../../NoData";

const AdminShowJobsStudent = ({ data, approveBtn, setApprovedJob }) => {
	const handleApprove = (id) => {
		setApprovedJob(id);
	};
	const handleViewProfile = (email) => {
		console.log(email);
	};

	if (data.length === 0) {
		return <NoData />;
	}
	return (
		<div className="job-card-container">
			{data.map((p) => {
				return (
					<div className="job-card" key={p._id}>
						<p>{JSON.stringify(p)}</p>
						<div className="active-btn-container">
							{approveBtn ? (
								<>
									<button
										className="btn active-btn"
										value={p.studentemail}
										onClick={(e) =>
											handleViewProfile(e.target.value)
										}
									>
										View Profile
									</button>
									<button
										className={
											p.approved
												? "btn success-btn"
												: "btn active-btn"
										}
										value={p._id}
										onClick={(e) =>
											handleApprove(e.target.value)
										}
									>
										{p.approved ? "Approved" : "Approve"}
									</button>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AdminShowJobsStudent;

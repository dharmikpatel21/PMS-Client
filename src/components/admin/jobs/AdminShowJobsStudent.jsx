import React from "react";
import NoData from "../../NoData";

const AdminShowJobsStudent = ({ data, approveBtn }) => {
	const handleApply = (id) => {
		console.log(id);
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
										className="active-btn"
										value={p.studentemail}
										onClick={(e) =>
											handleViewProfile(e.target.value)
										}
									>
										View Profile
									</button>
									<button
										className="active-btn"
										value={p._id}
										onClick={(e) =>
											handleApply(e.target.value)
										}
									>
										Approve
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

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
						<div className="job-details">
							<div className="row">
								<span>Company name:</span>
								<span>{p.name}</span>
							</div>
							<div className="row">
								<span>email:</span>
								<span>{p.email}</span>
							</div>
							<div className="row">
								<span>student email</span>
								<span>{p.studentemail}</span>
							</div>
							<div className="row">
								<span>location</span>
								<span>{p.location}</span>
							</div>
							<div className="row">
								<span>jobTitle</span>
								<span>{p.jobTitle}</span>
							</div>
							<div className="row">
								<span>jobDescription</span>
								<span>{p.jobDescription}</span>
							</div>
							<div className="row">
								<span>hiring Status:</span>
								<span>
									{p.hiringStatus ? "Open" : "Closed"}
								</span>
							</div>
							<div className="company-img-container">
								<img
									src={
										"/img/companies/" +
										p.name
											.toLowerCase()
											.replace(" ", "-")
											.replace(".", "") +
										".png"
									}
									alt={p.name
										.toLowerCase()
										.replace(" ", "-")
										.replace(".", "")}
								/>
							</div>
						</div>

						{/* buttons */}
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

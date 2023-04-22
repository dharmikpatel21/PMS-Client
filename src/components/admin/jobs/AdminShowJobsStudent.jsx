import React from "react";

const AdminShowJobsStudent = ({
	data,
	approveBtn,
	setApprovedJob,
	setProfileData,
	setShowProfile,
}) => {
	const handleApprove = (id) => {
		setApprovedJob(id);
	};
	const handleViewProfile = (email) => {
		setShowProfile(true);
		setProfileData(email);
	};

	return (
		<div className="job-card-container">
			{data.map((p) => {
				return (
					<div className="job-card" key={p._id} data-aos="fade-left">
						<div className="job-details">
							<div className="row" data-aos="fade-left">
								<span>Company name:</span>
								<span>{p.name}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="100"
							>
								<span>email:</span>
								<span>{p.email}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="200"
							>
								<span>student email:</span>
								<span>{p.studentemail}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="300"
							>
								<span>location:</span>
								<span>{p.location}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="400"
							>
								<span>jobTitle:</span>
								<span>{p.jobTitle}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="500"
							>
								<span>jobDescription:</span>
								<span>{p.jobDescription}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="600"
							>
								<span>hiring Status:</span>
								<span>
									{p.hiringStatus ? "Open" : "Closed"}
								</span>
							</div>
							<div className="company-img-container">
								<img
									data-aos="fade-down"
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
						<div
							className="active-btn-container"
							data-aos="fade-up"
							data-aos-offset="-500"
						>
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

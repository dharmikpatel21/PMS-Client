import React from "react";
import NoData from "../../NoData";

const StudentShowJobs = ({ data, applyBtn, setApplyJob }) => {
	const handelApply = (id) => {
		console.log(id);
		setApplyJob(() => id);
	};

	if (data.length === 0) {
		return <NoData />;
	}
	return (
		<div className="job-card-container">
			{data.map((p) => {
				if (p.hiringStatus === false) return;
				return (
					<div className="job-card" key={p._id}>
						<div className="job-details">
							<div className="row">
								<span>Company Name:</span>
								<span>{p.name}</span>
							</div>
							<div className="row">
								<span>Company Email:</span>
								<span>{p.email}</span>
							</div>
							<div className="row">
								<span>Location:</span>
								<span>{p.location}</span>
							</div>
							<div className="row">
								<span>jobTitle:</span>
								<span>{p.jobTitle}</span>
							</div>
							<div className="row">
								<span>jobDescription:</span>
								<span>{p.jobDescription}</span>
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
						{applyBtn ? (
							<div className="active-btn-container">
								<button
									className="btn active-btn"
									value={p._id}
									onClick={(e) => {
										handelApply(e.target.value);
										e.target.innerText = "Applied";
									}}
								>
									Apply
								</button>
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default StudentShowJobs;

import React from "react";

const StudentShowJobs = ({
	data,
	applyBtn,
	setApplyJob,
	removeBtn,
	setRemoveApplicationData,
}) => {
	const handelApply = (id) => {
		console.log(id);
		setApplyJob(() => id);
	};
	const handelRemove = (id) => {
		console.log(id);
		setRemoveApplicationData(id);
	};
	return (
		<div className="job-card-container">
			{data.map((p) => {
				if (p.hiringStatus === false) return <></>;
				return (
					<div className="job-card" key={p._id} data-aos="fade-left">
						<div className="job-details">
							<div className="row" data-aos="fade-left">
								<span>Company Name:</span>
								<span>{p.name}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="100"
							>
								<span>Company Email:</span>
								<span>{p.email}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="200"
							>
								<span>Location:</span>
								<span>{p.location}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="300"
							>
								<span>jobTitle:</span>
								<span>{p.jobTitle}</span>
							</div>
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="400"
							>
								<span>jobDescription:</span>
								<span>{p.jobDescription}</span>
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
						{/* delete button */}
						{removeBtn ? (
							<div
								className="active-btn-container"
								data-aos="fade-up"
								data-aos-offset="-500"
							>
								<button
									className="btn red-btn"
									value={p._id}
									onClick={(e) => {
										handelRemove(e.target.value);
									}}
								>
									Remove
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

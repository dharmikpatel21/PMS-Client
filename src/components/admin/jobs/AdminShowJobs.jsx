import React from "react";

const AdminShowJobs = ({ data, setRemoveJob, setEditJob, setShowEditForm }) => {
	const handleEdit = (_id) => {
		// console.log("Edit: " + _id);
		setEditJob(_id);
		setShowEditForm(true);
	};
	const handleRemove = (_id) => {
		const ans = window.confirm("Are you sure to delete record?");
		if (ans === 0) {
			return;
		}
		// console.log("Remove: " + _id);
		setRemoveJob(_id);
	};

	return (
		<div className="job-card-container">
			{data.map((p) => {
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
							<div
								className="row"
								data-aos="fade-left"
								data-aos-delay="500"
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
							<button
								className="btn active-btn"
								value={p._id}
								onClick={(e) => handleEdit(e.target.value)}
							>
								Edit
							</button>
							<button
								className="btn red-btn"
								value={p._id}
								onClick={(e) => handleRemove(e.target.value)}
							>
								Remove
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AdminShowJobs;

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
				return (
					<div className="job-card" key={p._id}>
						<p>{JSON.stringify(p)}</p>
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

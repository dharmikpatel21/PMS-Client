import React from "react";
import NoData from "../../NoData";

const AdminShowJobs = ({ data }) => {
	if (data.length === 0) {
		return <NoData />;
	}
	return (
		<div className="job-card-container">
			{data.map((p) => {
				return (
					<div className="job-card" key={p._id}>
						<p>{JSON.stringify(p)}</p>
					</div>
				);
			})}
		</div>
	);
};

export default AdminShowJobs;

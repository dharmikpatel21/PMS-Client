import React, { useEffect, useState } from "react";
import NoData from "../../NoData";
import axios from "axios";

const AdminShowJobs = ({ data, setRemoveJob, setEditJob }) => {
	const handleEdit = (_id) => {
		console.log("Edit: " + _id);
	};
	const handleRemove = (_id) => {
		const ans = window.confirm("Are you sure to delete record?");
		if (ans == 0) {
			return;
		}
		console.log("Remove: " + _id);
		setRemoveJob(_id);
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

import React, { useState } from "react";

const StudentEditProfile = ({
	setShowEditForm,
	updateDetails,
	updateProfileData,
	studentData,
}) => {
	// const [email, setEmail] = useState(studentData.email);
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");

	const handleCancel = () => {
		setShowEditForm(false);
	};
	const handleEdit = (e) => {
		e.preventDefault();
		if (confPassword !== password)
			return window.alert("Password Does not match");
		if (password === "" || confPassword === "")
			return window.alert("Password field should not empty");
		updateProfileData(updateDetails, { password });
	};

	return (
		<main>
			<span className="edit-form-cancel-btn" onClick={handleCancel}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</span>
			<div className="edit-form-container-wrapper" data-aos="zoom-in">
				<div className="form-container">
					<div className="title">Update Password</div>
					<form>
						<div className="details">
							<div className="input-box input-box-100">
								<span className="input-label">Email</span>
								<input
									type="email"
									placeholder={studentData.email}
									disabled
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">
									Change Password
								</span>
								<input
									type="password"
									placeholder="Enter New Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<div className="input-box input-box-50">
								<span className="input-label">
									Confirm Password
								</span>
								<input
									type="password"
									placeholder="Confirm Password"
									value={confPassword}
									onChange={(e) =>
										setConfPassword(e.target.value)
									}
									required
								/>
							</div>
						</div>
						<div className="button">
							<button className="form-btn" onClick={handleEdit}>
								Update Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default StudentEditProfile;

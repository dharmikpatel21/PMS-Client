import React from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../../css/dragNDrop.css";

const StudentUploadResume = ({
	setShowUploadResumeForm,
	setResumeFile,
	resumeFile,
	uploadResume,
}) => {
	const fileTypes = ["PDF"];

	const handleCancel = () => {
		setShowUploadResumeForm(false);
		setResumeFile(null);
	};

	const handleUpload = () => {
		uploadResume();
	};

	const handleChange = (file) => {
		setResumeFile(file);
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
					<div className="upload-resume-container">
						<h1>Drag & Drop Your Resume Here</h1>
						<p>
							Note: Rename file with your enrollment number before
							uploading
						</p>
						<FileUploader
							multiple={false}
							handleChange={handleChange}
							name="file"
							types={fileTypes}
							hoverTitle={"Drop Your Resume"}
							dropMessageStyle={{ backgroundColor: "green" }}
						/>
						<p>
							{resumeFile
								? `Selected File: ${resumeFile.name}`
								: "no files uploaded yet"}
						</p>
					</div>
					<div className="button">
						<button className="form-btn" onClick={handleUpload}>
							Upload
						</button>
					</div>
					{/* <form
						action="http://localhost:5001/api/student/upload/resume"
						encType="multipart/form-data"
						method="POST"
					>
						<input type="file" name="myFile" />
						<input type="submit" />
					</form> */}
				</div>
			</div>
		</main>
	);
};

export default StudentUploadResume;

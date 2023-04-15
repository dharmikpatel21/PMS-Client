import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
// admin
import AdminPrivateComponent from "./components/AdminPrivateComponent";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import AdminJobApplications from "./components/admin/jobs/AdminJobApplications";
// student
import StudentPrivateComponent from "./components/StudentPrivateComponent";
import AdminStudents from "./components/admin/students/AdminStudents";
import AdminApprovedJobs from "./components/admin/jobs/AdminApprovedJobs";
import StudentDashboard from "./components/student/Dashboard/StudentDashboard";
import AdminJobs from "./components/admin/jobs/AdminJobs";
import StudentJobs from "./components/student/jobs/StudentJobs";
import StudentJobApplications from "./components/student/jobs/StudentJobApplications";
import StudentApprovedJobs from "./components/student/jobs/StudentApprovedJobs";
import StudentProfile from "./components/student/profile/StudentProfile";
import AddStudent from "./components/admin/forms/AddStudent";
import AddJob from "./components/admin/forms/AddJob";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<StudentLogin />} />
				<Route path="/student/login" element={<StudentLogin />} />
				<Route path="/admin/login" element={<AdminLogin />} />
				{/* Admin Route */}
				<Route element={<AdminPrivateComponent />}>
					<Route
						path="/admin/dashboard"
						element={<AdminDashboard />}
					/>
					<Route path="/admin/students" element={<AdminStudents />} />
					<Route path="/admin/jobs" element={<AdminJobs />} />
					<Route
						path="/admin/jobapplications"
						element={<AdminJobApplications />}
					/>
					<Route
						path="/admin/approvedjobs"
						element={<AdminApprovedJobs />}
					/>
					<Route path="/admin/addstudent" element={<AddStudent />} />
					<Route path="/admin/addjob" element={<AddJob />} />
				</Route>
				{/* Student Route */}
				<Route element={<StudentPrivateComponent />}>
					<Route
						path="/student/dashboard"
						element={<StudentDashboard />}
					/>
					<Route path="/student/jobs" element={<StudentJobs />} />
					<Route
						path="/student/jobapplications"
						element={<StudentJobApplications />}
					/>
					<Route
						path="/student/approvedjobs"
						element={<StudentApprovedJobs />}
					/>
					<Route
						path="/student/myprofile"
						element={<StudentProfile />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

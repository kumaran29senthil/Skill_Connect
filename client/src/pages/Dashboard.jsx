import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        stats: { activeJobs: 0, totalApplicants: 0, hired: 0 },
        recentJobs: []
    });
    
    // NEW: State for the Modal
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Effect 1: Read user from localStorage and redirect if not logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!storedUser || !token) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
    }, [navigate]);

    // Effect 2: Fetch dashboard data once user is confirmed
    useEffect(() => {
        if (!user) return;
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/jobs/dashboard");
                setDashboardData(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                }
            }
        };
        fetchDashboard();
    }, [user, navigate]);

    // NEW: Function to open modal and fetch applicants
    const handleViewApplicants = async (jobId) => {
        try {
            setSelectedJobId(jobId);
            const res = await api.get(`/jobs/${jobId}/applicants`);
            setApplicants(res.data);
            setShowModal(true);
        } catch (_err) {
            alert("Error fetching applicants");
        }
    };

    // NEW: Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setApplicants([]);
        setSelectedJobId(null);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-4 position-relative">
            
            {/* --- HEADER & STATS (Same as before) --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark">Welcome, {user.name}</h2>
                    <p className="text-muted">Here is your recruitment overview</p>
                </div>
                <button className="btn btn-primary shadow-sm" onClick={() => navigate("/post-job")}>
                    + Post New Job
                </button>
            </div>

            <div className="row mb-5">
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow h-100">
                        <div className="card-body">
                            <h6 className="opacity-75 text-uppercase">Active Jobs</h6>
                            <h1 className="fw-bold display-4 mb-0">{dashboardData.stats.activeJobs}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow h-100">
                        <div className="card-body">
                            <h6 className="opacity-75 text-uppercase">Total Applicants</h6>
                            <h1 className="fw-bold display-4 mb-0">{dashboardData.stats.totalApplicants}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning shadow h-100">
                        <div className="card-body">
                            <h6 className="opacity-75 text-uppercase">Hired</h6>
                            <h1 className="fw-bold display-4 mb-0">{dashboardData.stats.hired}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- JOBS TABLE --- */}
            <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                    <h5 className="mb-0 fw-bold">Recent Job Posts</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">Job Title</th>
                                <th>Location</th>
                                <th>Applicants</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentJobs.length === 0 ? (
                                <tr><td colSpan="4" className="text-center p-4 text-muted">No Jobs posted yet.</td></tr>
                            ) : (
                                dashboardData.recentJobs.map(job => (
                                    <tr key={job._id}>
                                        <td className="ps-4 fw-bold">{job.title}</td>
                                        <td className="text-muted">{job.location}</td>
                                        <td>
                                            <span className="badge bg-secondary rounded-pill px-3">
                                                {job.applicants.length}
                                            </span>
                                        </td>
                                        <td>
                                            {/* NEW: View Button */}
                                            <button 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handleViewApplicants(job._id)}
                                            >
                                                View Applicants
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- APPLICANTS MODAL (Simple Overlay) --- */}
            {showModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                     style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="card shadow-lg" style={{ width: '500px', maxHeight: '80vh' }}>
                        <div className="card-header d-flex justify-content-between align-items-center bg-white">
                            <h5 className="mb-0 fw-bold">Applicant List</h5>
                            <button onClick={closeModal} className="btn-close"></button>
                        </div>
                        <div className="card-body overflow-auto">
                            {applicants.length === 0 ? (
                                <p className="text-center text-muted my-4">No applicants yet.</p>
                            ) : (
                                <ul className="list-group list-group-flush">
                                    {applicants.map(app => (
                                        <li key={app._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <div className="fw-bold">{app.name}</div>
                                                <small className="text-muted">{app.email}</small>
                                            </div>
                                            <button className="btn btn-sm btn-success rounded-pill">Contact</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="card-footer bg-light text-end">
                            <button onClick={closeModal} className="btn btn-secondary btn-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
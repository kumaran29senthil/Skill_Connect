import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // State to hold dynamic data
  const [dashboardData, setDashboardData] = useState({
    stats: { activeJobs: 0, totalApplicants: 0, hired: 0 },
    recentJobs: []
  });

  const [loading, setLoading] = useState(true);

  // FETCH DATA ON LOAD
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs/dashboard", {
          headers: { "x-auth-token": token } // Show the VIP wristband
        });
        const data = await res.json();
        
        if (res.ok) {
            setDashboardData(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {user?.name} 👋</h2>
          <p>Here is what is happening with your jobs today.</p>
        </div>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </div>

      {/* DYNAMIC STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card blue-card">
          <h3>Active Jobs</h3>
          <h1>{dashboardData.stats.activeJobs}</h1>
          <small>Updated just now</small>
        </div>
        <div className="stat-card green-card">
          <h3>Total Applicants</h3>
          <h1>{dashboardData.stats.totalApplicants}</h1>
          <small>Across all jobs</small>
        </div>
        <div className="stat-card purple-card">
          <h3>Hired</h3>
          <h1>{dashboardData.stats.hired}</h1>
          <small>Candidates</small>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="content-section">
        <div className="section-header">
            <h3>Recent Job Posts</h3>
            <button className="btn-primary small" onClick={() => navigate('/post-job')}>+ Post Job</button>
        </div>
        
        <div className="card-list">
            {loading ? <p>Loading...</p> : dashboardData.recentJobs.length === 0 ? (
                <p style={{color: '#64748b'}}>No jobs posted yet. Click "Post Job" to get started!</p>
            ) : (
                dashboardData.recentJobs.map(job => (
                    <div key={job._id} className="list-item">
                        <div>
                            <h4>{job.title}</h4>
                            <small>{job.location} • {new Date(job.createdAt).toLocaleDateString()}</small>
                        </div>
                        <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs/all'); // Matches the new route
                setJobs(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = async (jobId) => {
        try {
            // 1. Call the API
            await api.post(`/jobs/${jobId}/apply`);
            
            // 2. Show Success
            alert("Application Sent Successfully! 🚀");
            
        } catch (err) {
            // 4. Handle Errors (Like "Already Applied")
            alert(err.response?.data?.msg || "Error applying for job");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 fw-bold">Latest Job Openings</h2>
            <div className="row">
                {jobs.map(job => (
                    <div key={job._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="card-title fw-bold">{job.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                                    </div>
                                    <span className="badge bg-primary">{job.type}</span>
                                </div>
                                
                                <p className="card-text mt-3 text-secondary">
                                    {job.description.substring(0, 100)}...
                                </p>
                                
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <small className="text-muted">
                                        📍 {job.location} | 💰 {job.salary}
                                    </small>
                                    <button 
                                        onClick={() => handleApply(job._id)} 
                                        className="btn btn-primary btn-sm px-4"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
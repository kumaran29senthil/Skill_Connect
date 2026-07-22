import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PostJob = () => {
    const navigate = useNavigate();
    
    // 1. State for Form Data
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        category: "Tech",
        description: "",
        type: "Full-Time"
    });

    // 2. Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/jobs', formData);
            alert('Job Posted Successfully! 🚀');
            navigate('/dashboard');
        } catch (_err) {
            alert('Error Posting Job');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow p-4">
                <h2 className="mb-4">📢 Post a New Job</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Row 1: Title & Company */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Job Title</label>
                            <input name="title" className="form-control" onChange={handleChange} required placeholder="e.g. React Developer" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Company Name</label>
                            <input name="company" className="form-control" onChange={handleChange} required placeholder="e.g. Google" />
                        </div>
                    </div>

                    {/* Row 2: Location & Salary */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Location</label>
                            <input name="location" className="form-control" onChange={handleChange} required placeholder="e.g. Remote / Chennai" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Salary</label>
                            <input name="salary" className="form-control" onChange={handleChange} required placeholder="e.g. $5000/mo" />
                        </div>
                    </div>

                    {/* Row 3: Category & Type */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Category</label>
                            <select name="category" className="form-select" onChange={handleChange}>
                                <option>Tech</option>
                                <option>Marketing</option>
                                <option>Design</option>
                                <option>Sales</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Job Type</label>
                            <select name="type" className="form-select" onChange={handleChange}>
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                                <option>Contract</option>
                                <option>Internship</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">Job Description</label>
                        <textarea name="description" className="form-control" rows="4" onChange={handleChange} required placeholder="Describe the role..."></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-3">
                        <button className="btn btn-primary w-50">Publish Job</button>
                        <button type="button" className="btn btn-secondary w-50" onClick={() => navigate('/dashboard')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
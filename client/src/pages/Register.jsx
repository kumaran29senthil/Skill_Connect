import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../api/axios";
const Register = () => {
    const navigate=useNavigate();
    
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"candidate"
    });

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res = await api.post("/auth/register",formData);

            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));

            alert("Registration Successful");

            if(res.data.user.role==="employer"){
                navigate('/dashboard');
            }else{
                navigate('/jobs');
            }
        }catch(err){
        alert(err.response?.data?.message || 'Register failed');
       }
    }
  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className='card shadow-lg p-4'>
                    <div className="text-center mb-4">
                        <h2 className="text-primary fw-bold text-center">Create Account</h2>
                    </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Full Name</label>
                                <input type="text" name="name" className="form-control"  onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Email address</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" name="password" className="form-control"  onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">I am a:</label>
                                <select name="role" className="form-select" onChange={handleChange} value={formData.role} required >
                                    <option value="candidate">Job Seeker</option>
                                    <option value="employer">Employer</option>
                                </select>
                            </div>
                            <button className="btn btn-primary w-100 py-2 fw-bold">Register</button>
                        </form>
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login" className="fw-bold">Sign in</Link>
                        </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
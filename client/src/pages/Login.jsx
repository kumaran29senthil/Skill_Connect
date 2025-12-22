import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import { useState } from 'react';
import api from "../api/axios"
const Login = () => {
    const navigate=useNavigate();

    const [formData,setFormData]=useState({email:"",password:""});

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res= await api.post('/auth/login',formData);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            alert("Login Successfull");

            if(res.data.user.role==="employer"){
                navigate('/dashboard');
            }else{
                navigate('/home')
            }
        }catch(err){
            alert(err.response?.data?.message ||'Login Failed');
        }
    };

  return (
    <div className="container mt-5">
        <div className='row justify-content-center'>
            <div className='col-md-5'>
                <div className='card shadow-lg p-4'>
                    <div className='text-center mb-4'>
                        <h2 className='fw-bold text-primary'>Welcome Back</h2>
                        <p className='text-muted'>Login to manage your jobs</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className="form-label fw-bold">Email</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className='mb-4'>
                            <label className='form-label fw-bold'>Password</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} required />
                        </div>
                        <button className="btn btn-primary fw-bold w-100 py-2">Login</button>
                    </form>

                    <div className="text-center mt-3 text-muted">
                        New here ? <Link to="/register" className="text-primary fw-bold">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
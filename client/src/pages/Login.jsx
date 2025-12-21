import React from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {useState} from 'react';
const Login = () => {

    const navigate=useNavigate();

    const[formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch('http://localhost:5000/api/auth/login',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),
            });
            const data=await res.json();

            if(res.ok){
                alert('Login Successfully');
                localStorage.setItem('token',data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                if(data.user.role==='employer'){
                    navigate('/dashboard');
                }else{
                    navigate('/jobs');
                }
            }else{
                alert(data.msg);
            }
        }catch(err){
            alert('Something went wrong');
        }
    }
  return (
    <div className="auth-container">
        <div className="auth-card">
            <h2>Welcome back</h2>
            <p>Sign in to your account</p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <lable>Email</lable>
                    <input name='email' type='email' onChange={handleChange} required placeholder="Enter your email address" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name='password' type='password' onChange={handleChange} required placeholder="Enter your password" />
                </div>

                <button className="btn-primary">Login</button>
            </form>

            <p className="footer-text">
                Already have an account ? <Link to="/register">Create one here</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
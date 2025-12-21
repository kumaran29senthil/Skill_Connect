import React from 'react'
import {useNavigate,Link} from 'react-router-dom';
import {useState} from 'react';
const Register = () => {
      
    const navigate=useNavigate();

    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:'candidate'
    });

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch('http://localhost:5000/api/auth/register',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),
            });
            const data=await res.json();

            if(res.ok){
                alert('Registration Successful');

                localStorage.setItem('token',data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                if (data.user.role === 'employer') {
                    navigate('/dashboard'); 
                } else {
                    navigate('/jobs'); 
                }
            }else {
                alert(data.msg);
            }
        }catch(err){
            console.log(err);
            alert('Something went wrong Is the server running ?');
        }
    }

  return (
    <div className='auth-container'>
        <div className="auth-card">
            <h2>Create Account</h2>
            <p>Join thousands of professionals</p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Full Name</label>
                    <input name='name' type="text" onChange={handleChange} required placeholder="Enter your full name" />
                 </div>

                 <div className="form-group">
                    <label>Email Address</label>
                    <input name='email' type="email"  onChange={handleChange} required placeholder="Enter your email address" />
                 </div>

                 <div className="form-group">
                    <label>Password</label>
                    <input name='password' type="password" onChange={handleChange} required  placeholder="Enter your password" />
                 </div>

                 <div className="form-group">
                    <label>I am a:</label>
                    <div className="role-selector">

                        <div
                            className={`role-box ${formData.role === 'candidate' ? 'active' : ''}`}
                            onClick={()=> setFormData({...formData,role:'candidate'})}
                        >
                            Job Seeker
                        </div>

                        <div
                            className={`role-box ${formData.role==='employer' ? 'active': ''}`}
                            onClick={()=>setFormData({...formData,role:'employer'})}
                        >
                            Employer
                        </div>

                    </div>
                 </div>

                 <button className="btn-primary">Create Account</button>
            </form>

            <p className="footer-text">
                Already have an account ? <Link to="/login">Sign in</Link>
            </p>
        </div>
    </div>
  )
}

export default Register;
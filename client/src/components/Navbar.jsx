import React from 'react'
import {Link , useNavigate} from "react-router-dom";
const Navbar = () => {
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user'));

    if(!user) return null;

    const handleLogout=()=>{
        localStorage.clear();
        navigate('/login');
    }
  return (
    <nav>
        <div className="navbar navbar-dark navbar-grad px-4 shadow-sm">
            <div className="container-fluid">
                <Link className='navbar-brand fw-bold' to={user.role === 'employer' ? "/dashboard" : "/home"}>
                  SkillConnect
                </Link>
                <div className="d-flex align-items-center text-white">
                    <span className="me-3 opacity-75">Hello {user.name}</span>
                    <button onClick={handleLogout} className="btn btn-sm btn-light text-dark fw-bold">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
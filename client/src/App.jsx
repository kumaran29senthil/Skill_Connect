import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Navbar from "./components/Navbar.jsx";
import PostJob from "./pages/PostJob.jsx";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Set Login as the default page for now to test it */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
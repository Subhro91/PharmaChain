import { useState } from "react";
import axios from "axios";
// Import useLocation
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Header from './Header';

export default function AuthPage() {
  // Get the location object
  const location = useLocation();
  
  
  const [isRegister, setIsRegister] = useState(location.state?.isRegister || false);
  
  const [role, setRole] = useState("manufacturer");
  const [form, setForm] = useState({
    name: "",
    license_no: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegister) {
        if (form.password !== form.confirmPassword) {
          setMessage("❌ Passwords do not match");
          return;
        }
        // Registration
        await axios.post(`https://blockchain-drug-counterfit.vercel.app/api/register/${role}`, {
          name: form.name,
          license_no: form.license_no,
          email: form.email,
          password: form.password,
        });
        setMessage("✅ Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        // Login
        const res = await axios.post(`https://blockchain-drug-counterfit.vercel.app/api/login/${role}`, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Redirect based on role
        if (role === "manufacturer") {
          navigate("/register-medicine");
        } else {
          navigate("/verify-medicine");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4F1] to-[#D4E9E2]">
      <Header />
      
      <div className="flex flex-col items-center justify-center pt-12 pb-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-[#27A292]" />
              <span className="text-2xl font-bold text-gray-800">PharmaChain</span>
            </div>
            <h2 className="text-xl font-semibold text-center mt-4">
              {isRegister ? "Create Your Account" : "Welcome Back"}
            </h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              {isRegister ? "Join thousands of healthcare professionals" : "Sign in to continue"}
            </p>
          </div>

         
          <div className="mb-4 relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-[#27A292]"
            >
              <option>I am a Manufacturer</option>
              <option>I am a Pharmacy Owner</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegister && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="license_no"
                  placeholder="License Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
                  value={form.license_no}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>

            {isRegister && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27A292]"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            {!isRegister && (
              <div className="text-right text-sm">
                <button className="font-medium text-[#27A292] hover:underline">Forgot Password?</button>
              </div>
            )}

            <button type="submit" className="w-full bg-[#27A292] text-white py-3 rounded-lg font-semibold hover:bg-[#208375] transition-colors">
              {isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}

          <p className="mt-8 text-center text-sm text-gray-600">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              className="font-medium text-[#27A292] hover:underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Sign In" : "Create one now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router";
import bg from "../assets/images/bg.jpg";
import logo from '../assets/images/signin4.png';
import { loginTeacher } from "../services/api"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {

    const [showPassword, setPassword] = useState(false); 
    const style = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }; 

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    // 1. State for the error message
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors on new attempt
        
        try {
            const result = await loginTeacher(form.username, form.password);

            if (result.success) {
                navigate("/teacher");
            } else {
                // 2. Set specific message if server returns a failure
                setError("Incorrect password or username.");
            }
        } catch (error) {
            console.error("Login error:", error);
            // This triggers if the server is down or the request fails
            setError("Could not connect to the server.");
        }
    };

    return (
        <div className="flex flex-row h-screen">
            <div className="w-full md:w-1/2 relative flex items-center justify-center" style={style}>
                <div className="absolute inset-0 bg-white/75"></div>

                <div className="relative z-10 w-full max-w-sm p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="flex items-center gap-3 border-b-2">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full p-2 outline-none bg-transparent"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                required/>
                            <FaUser className="text-xl" />
                        </div>

                        <div className="flex items-center gap-3 border-b-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-2 outline-none bg-transparent"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required/>
                            <button type="button" onClick={() => setPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                        </div>

                        {/* 3. Error message display under the password field */}
                        {error && (
                            <p className="text-red-600 text-sm font-medium mt-1">
                                {error}
                            </p>
                        )}

                        <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition-colors mt-4">
                            Login
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 bg-red-900 text-white items-center justify-center relative">
                <div className="text-center justify-center items-center">
                    <div className="flex justify-center text-center">
                        <img src={logo} alt="logorms" className="w-55"/>
                    </div>
                    <h1 className="text-2xl font-bold">Batangas Metropolitan University</h1>
                    <p className="text-sm mt-2">The National Technological University</p>
                </div>
            </div>
        </div>
    );
}
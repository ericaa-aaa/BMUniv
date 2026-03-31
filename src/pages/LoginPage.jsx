import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router";
import bg from "../assets/images/bg.jpg";
import logo from '../assets/images/signin4.png';
// 1. Import the API function
import { loginTeacher } from "../services/api"; 

export default function LoginPage() {
    const style = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }; 

    const navigate = useNavigate();

    const [form, setForm] = useState ({
        username: "",
        password: "",
    });

    // 2. Make this function async
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // 3. Call the real backend login
            const result = await loginTeacher(form.username, form.password);

            if (result.success) {
                // If login works, the token is already saved in localStorage via the API function
                navigate("/teacher");
            } else {
                // Show the error message from Flask (e.g., "Invalid credentials")
                alert(result.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Could not connect to the server.");
        }
    };

    return (
        <div className="flex flex-row h-screen" >
            {/* KALIWA */}
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
                                value={form.username} // Added value for controlled component
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                            />
                            <FaUser className="text-xl" />
                        </div>

                        <div className="flex items-center gap-3 border-b-2">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-2 outline-none bg-transparent"
                                value={form.password} // Added value for controlled component
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <IoMdLock className="text-xl" />
                        </div>

                        <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition-colors">
                            Login
                        </button>
                    </form>
                </div>
            </div>

            {/* KANAN */}
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
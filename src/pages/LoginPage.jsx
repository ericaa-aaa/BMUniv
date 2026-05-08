import { useState } from "react";
import { useNavigate } from "react-router";
import bg from "../assets/images/bg.jpg";
import logo from '../assets/images/signin4.png';
import { loginUser } from "../services/student_teacherloginauth";

export default function LoginPage() {
    const [showPassword, setPassword] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const result = await loginUser(form.username, form.password);
            if (result.success) {
                result.role === "teacher" ? navigate("/teacher") : navigate("/student");
            } else {
                setError(result.message || "Invalid credentials.");
            }
        } catch (err) {
            setError("Could not connect to the server.");
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-red-900">
            {/* LEFT SECTION: Form & Background Image */}
            <div 
                className="relative w-full md:w-[55%] h-full flex items-center justify-center z-10"
                style={{ 
                    ...backgroundStyle, 
                    clipPath: "polygon(0 0, 80% 0, 100% 100%, 0% 100%)" 
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-white/80"></div>

                {/* Form Container */}
                <div className="relative z-20 w-full max-w-md px-12 md:pr-24">
                    <h1 className="text-4xl font-['Inter'] font-extrabold mb-8 text-gray-900 text-center">Login</h1>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex items-center gap-3 border-b-2 border-gray-500 py-2 focus-within:border-red-800 transition-colors">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full bg-transparent font-['Inter'] outline-none text-black"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                required
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 border-b-2 border-gray-500 py-2 focus-within:border-red-800 transition-colors">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full bg-transparent font-['Inter'] outline-none text-black"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                            <button type="button" onClick={() => setPassword(!showPassword)} className="text-gray-400 hover:text-red-800">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

                        <button type="submit" className="w-full bg-red-800 text-white py-3 rounded-md font-['Inter'] font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95">
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex flex-1 bg-red-900 text-white items-center justify-center relative">
                <div className="text-center z-0 font-['Inter'] space-y-4"> 
                    <img src={logo} alt="University Logo" className="w-64 mx-auto" />
                    <h2 className="text-3xl font-bold">Batangas Metropolitan University</h2>
                    <p className="text-lg">The National Technological University</p>
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router";
import bg from "../assets/images/bg.jpg";
import logo from '../assets/images/signin4.png';

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
    
    const handleLogin = (e) => {
        e.preventDefault();
        // eme eme lungs ichange na lang sa DTB
        if (form.username === "teacher" &&
            form.password === "1234" ) {
                navigate("/teacher");
            } else {
                alert("Invalid credentials");
            }
    };

    return (
        <div className="flex flex-row h-screen" >

        {/* KALIWA */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center" style={style}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/75"></div>

            {/* Login Container */}
            <div className="relative z-10 w-full max-w-sm p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                
                <div className="flex items-center gap-3 border-b-2">
                    <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 outline-none bg-transparent"
                    onChange={(e) =>
                    setForm({ ...form, username: e.target.value })}/>
                    <FaUser className="text-xl" />
                </div>

                <div className="flex items-center gap-3 border-b-2">
                    <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 outline-none bg-transparent"
                    onChange={(e) =>
                    setForm({ ...form, password: e.target.value })}/>
                    <IoMdLock className="text-xl" />
                </div>

                <button className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700">
                    Login
                </button>
                </form>
            </div>
            </div>

        {/* KANAN */}
        <div className="hidden md:flex w-1/2 bg-red-900 text-white items-center justify-center relative">
            <div className="text-center justify-center items-center">
                <div className="justify-center text-center">
                    <img src={logo} alt="logorms" className="w-55"/>
                </div>
                <h1 className="text-2xl font-bold">Batangas Metropolitan University</h1>
                <p className="text-sm mt-2">The National Technological University</p>
            </div>
        </div>

        </div>
   );
}
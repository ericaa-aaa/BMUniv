import { useState, useEffect } from 'react';
import profileDefault from '../../../assets/images/faculty1.png'; // Default image
import { FacultyTeacherService } from '../../../services/facultyteacherservice';

export default function Profile() {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [fullname, setFullname] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const data = await FacultyTeacherService.Loadprofile();
                if (data) {
                    if (data.profile_photo) {
                        setProfilePhoto(data.profile_photo);
                    }
                    setFullname(data.full_name || "");
                    setTitle(data.position || "");
                    setEmail(data.email || "");
                }
            } catch (error) {
                console.error("Error loading teacher data:", error);
            }
        };
        fetchTeacherData();
    }, []);

    return (
        <div className="bg-white/30 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
            {/* Profile Image Section */}
            <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#630000]/80 shadow-lg bg-white">
                    <img 
                        src={profilePhoto || profileDefault} 
                        alt="Faculty" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>

            {/* Teacher's Name - FIXED: Used state variable 'fullname' */}
            <div>
                <label className="block text-[17px] font-semibold text-[#630000] mb-1">
                    Teacher's Name
                </label>
                <div className="w-full px-4 py-2 rounded-lg bg-white/50 border border-[#810100] text-[#630000] font-medium">
                    {fullname || "Loading..."}
                </div>
            </div>

            {/* Title/Position - FIXED: Used state variable 'title' */}
            <div>
                <label className="block text-[17px] font-semibold text-[#630000] mb-1">
                    Title
                </label>
                <div className="w-full px-4 py-2 rounded-lg bg-white/50 border border-[#810100] text-[#630000] font-medium">
                    {title || "Loading..."}
                </div>
            </div>

            {/* Email Address - FIXED: Used state variable 'email' */}
            <div>
                <label className="block text-[17px] font-semibold text-[#630000] mb-1">
                    Email Address
                </label>
                <div className="w-full px-4 py-2 rounded-lg bg-white/50 border border-[#810100] text-[#630000] font-medium">
                    {email || "Loading..."}
                </div>
            </div>
        </div>
    );
}

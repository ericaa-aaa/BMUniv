
import Page1 from "../StudentEnrollment/ElementaryPages/Page1"
import back from "../../../assets/images/bg.jpg"

export default function Elementary() {
    return (
        <section 
            className="h-screen bg-cover bg-no-repeat bg-fixed bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            {/* This div acts as your overlay and container */}
            <div className="min-h-screen bg-white/90 p-4">
                
                <div className="flex justify-center mb-1">
                    <p className="text-[#EDEBDD] font-['Inter'] bg-[#630000] w-full max-w-110 font-semibold text-[25px] rounded-2xl p-2 text-center">
                        Elementary Enrollment Form
                    </p>
                </div>

                <div className="relative">
                    <Page1 />
                </div>
            </div>
        </section>
    );
}
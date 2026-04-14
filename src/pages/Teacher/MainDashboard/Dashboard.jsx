import { useState, useEffect } from 'react'; // 1. Import hooks
import profile from '../../../assets/images/faculty1.png';
import back from "../../../assets/images/bg.jpg";

function Dashboard() {
  // 2. Setup state for your counts
  const [counts, setCounts] = useState({
    elementary: 0,
    highSchool: 0,
    seniorHigh: 0
  });

  // 3. Fetch data from your Flask API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students/count');
        const data = await response.json();
        setCounts({
          elementary: data.elementary,
          highSchool: data.highSchool,
          seniorHigh: data.seniorHigh
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="h-screen bg-cover bg-no-repeat bg-fixed bg-center"
                style={{ backgroundImage: `url(${back})` }}>
      <div className="min-h-screen bg-white/75 p-4">
      
        <div className="flex justify-end mr-10">
          <p className='pt-12 font-["Inter"] text-[#1B1717] font-medium'>Teacher Juan Dela Cruz</p>
          <img src={profile} alt='Faculty' className='w-30 h-30'></img>
        </div>

        <div className="flex justify-around mt-17 font-['Inter'] font-semibold ">
          {/* 4. Display the dynamic counts */}
          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl font-bold text-[#EDEBDD] transition-all duration-500 hover:scale-110">
                {counts.elementary}
            </h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>Elementary Students</p>
          </div>

          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl text-[#EDEBDD] font-bold transition-all duration-500 hover:scale-110">
                {counts.highSchool}
            </h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>High School Enrolled</p>
          </div>

          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl font-bold text-[#EDEBDD] transition-all duration-500 hover:scale-110">
                {counts.seniorHigh}
            </h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>SHS Enrolled</p>
          </div>
        </div>

        <div className='bg-[#EDEBDD] w-340 h-132 flex ml-19 mt-11 rounded-[15px]'></div>
      </div>
    </section>
  );
}

export default Dashboard;
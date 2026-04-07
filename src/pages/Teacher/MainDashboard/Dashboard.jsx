import profile from '../../../assets/images/faculty1.png'
import back from "../../../assets/images/bg.jpg"


function Dashboard() {
  return (
    <div className="flex-1 bg-cover bg-no-repeat bg-fixed bg-center"
        style={{ backgroundImage: `url(${back})` }}>
      <div className="relative p-8">
      <div className="absolute inset-0 bg-white/75"></div>
      

        <div className="flex justify-end mr-10">
          <p className='pt-12 font-["Inter"] text-[#1B1717] font-medium'>Teacher Juan Dela Cruz</p>
          <img src={profile} alt='Faculty' className='w-30 h-30'></img>
        </div>


        <div className="flex justify-around mt-17 font-['Inter'] font-semibold ">
          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl font-bold text-[#EDEBDD]">100</h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>Elementary Students</p>
          </div>

          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl text-[#EDEBDD] font-bold">10</h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>High School Enrolled</p>
          </div>

          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl font-bold text-[#EDEBDD]">100</h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>SHS Enrolled</p>
          </div>
        </div>

        <div className='bg-[#EDEBDD] w-340 h-132 flex ml-19 mt-11 rounded-[15px]'></div>

      </div>
    </div>
     
  );
};

export default Dashboard;

import back from '../../../assets/images/bg.jpg';
import { useState } from 'react';
import Add from './HSbutton/add';
import Display from './HSbutton/display';

export default function ElemFaculty() {
  const [view, setView] = useState('display');
  
  const [facultyList, setFacultyList] = useState([]);

  const handleAddFaculty = (newFaculty) => {
    setFacultyList((prev) => [...prev, newFaculty]);
  };


  return (
    <section className="h-screen bg-cover bg-no-repeat bg-fixed bg-center" style={{ backgroundImage: `url(${back})` }}>
      <div className="min-h-screen bg-white/90 p-4">
        
        <div className="flex justify-center mb-5 mt-2 gap-10">
          
          <button 
            onClick={() => setView('display')}
            className={`w-full max-w-70 font-semibold text-[25px] rounded-2xl p-2 text-center transition-colors font-['Inter'] ${
              view === 'display' ? 'bg-[#630000] text-[#EDEBDD]' : 'bg-[#EDEBDD] text-[#630000]'
            }`}
          >
            Display Faculty
          </button>

          <button 
            onClick={() => setView('add')}
            className={`w-full max-w-70 font-semibold font-['Inter'] text-[25px] rounded-2xl p-2 text-center transition-colors ${
              view === 'add' ? 'bg-[#630000] text-[#EDEBDD]' : 'bg-[#EDEBDD] text-[#630000]'
            }`}
          >
            Add Faculty
          </button>
        </div>
        
        {/* mag didisplay dito yung mga faculty */}
        <div className="mt-10">
          {view === 'display' && (
            <Display setView={setView} facultyList={facultyList} /> 
          )}

          {view === 'add' && (
            <Add setView={setView} onAddSuccess={handleAddFaculty} /> 
          )}
        </div>

      </div>
    </section>
  );
}
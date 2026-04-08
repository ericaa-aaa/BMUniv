import back from '../../../assets/images/bg.jpg';
import { useState } from 'react';
import Add from './HSbutton/add';

export default function ElemFaculty() {
  // 'view' tracks which "tab" is active: 'display' or 'add'
  const [view, setView] = useState('display'); 

  return (
    <section className="h-screen bg-cover bg-no-repeat bg-fixed bg-center" style={{ backgroundImage: `url(${back})` }}>
      <div className="min-h-screen bg-white/75 p-4">
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mb-5 gap-10">
          
          <button 
            onClick={() => setView('display')}
            className={`w-full max-w-80 font-semibold text-[30px] rounded-2xl p-3 text-center transition-colors ${
              view === 'display' ? 'bg-[#630000] text-[#EDEBDD]' : 'bg-[#EDEBDD] text-[#630000]'
            }`}
          >
            Display Faculty
          </button>

          <button 
            onClick={() => setView('add')}
            className={`w-full max-w-80 font-semibold text-[30px] rounded-2xl p-3 text-center transition-colors ${
              view === 'add' ? 'bg-[#630000] text-[#EDEBDD]' : 'bg-[#EDEBDD] text-[#630000]'
            }`}
          >
            Add Faculty
          </button>
        </div>
        
        {/* mag didisplay dito yung mga faculty */}
        <div className="mt-10">
          {view === 'display' && (
            <div className="text-center text-2xl">
              <h2>Faculty List will appear here...</h2>
            </div>
          )}

          {view === 'add' && (
            <Add setView={setView} /> 
          )}
        </div>

      </div>
    </section>
  );
}
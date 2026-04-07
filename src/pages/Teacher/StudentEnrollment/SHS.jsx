
import Page1 from "../StudentEnrollment/SeniorPages/Page1"
import Page2 from "../StudentEnrollment/SeniorPages/Pages2"
import LastPage from "../StudentEnrollment/SeniorPages/LastPage"
import back from "../../../assets/images/bg.jpg"
import { useState } from 'react'

export default function Elementary() {

    const [page, setPage] = useState(1);

    return (

        <section className="h-screen bg-cover bg-no-repeat bg-fixed bg-center"
            style={{ backgroundImage: `url(${back})` }}>

            <div className="min-h-screen bg-white/75 p-4">

                <div className="flex justify-center">
                    <p className="flex justify-center text-[#EDEBDD] font-['Inter'] bg-[#630000] w-130 font-semibold text-[30px] rounded-2xl p-3">SHS Enrollment Form</p>
                </div>

                {page === 1 && <Page1 />}
                {page === 2 && <Page2 />}
                {page === 3 && <LastPage />}

                    <div className="flex justify-end mt-5 gap-2">
                        <button 
                            onClick={() => setPage(page - 1)} 
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-300"
                            >
                            {"<"}
                        </button>

                        <span className="px-3 py-1 bg-[#630000] text-white">{page}</span>

                            <button 
                                onClick={() => setPage(page + 1)} 
                                disabled={page === 3}
                                className="px-3 py-1 bg-[#630000] text-white">
                                {">"}
                            </button>
                        </div>
             </div>
        </section>
    )
}
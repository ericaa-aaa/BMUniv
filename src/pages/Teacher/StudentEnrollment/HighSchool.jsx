
import Page1 from "../StudentEnrollment/HighSchoolPages/Page1"
import Page2 from "../StudentEnrollment/HighSchoolPages/Page2"
import LastPage from "./HighSchoolPages/LastPage"
import { useState } from 'react'

export default function Elementary() {

    const [page, setPage] = useState(1);

    return (

        <section className="flex-1 h-screen bg-[url('../../../assets/images/bg.jpg')] bg-cover bg-no-repeat relative bg-position-[50%_25%]">
            <div className="absolute inset-0 bg-white/75">

            <div className="relative p-4"></div>

                <div className="flex justify-center">
                    <p className="flex justify-center text-[#EDEBDD] font-['Inter'] bg-[#630000] w-130 font-semibold text-[30px] rounded-2xl p-3"> Enrollment Form</p>
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
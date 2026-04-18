
import Page1 from "../StudentEnrollment/SeniorPages/Page1"
import back from "../../../assets/images/bg.jpg"
import { useState } from 'react'

export default function Elementary() {

    const [page, setPage] = useState(1);

    return (

        <section className="h-screen bg-cover bg-no-repeat bg-fixed bg-center"
            style={{ backgroundImage: `url(${back})` }}>

            <div className="min-h-screen bg-white/90 p-4">

                <div className="flex justify-center">
                    <p className="flex justify-center text-[#EDEBDD] font-['Inter'] bg-[#630000] w-130 font-semibold text-[30px] rounded-2xl p-3">SHS Enrollment Form</p>
                </div>

                <Page1 />
             </div>
        </section>
    )
}
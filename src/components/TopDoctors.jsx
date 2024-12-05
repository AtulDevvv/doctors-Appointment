import React from 'react'
// import { doctors } from '../assets/asset'
import { useNavigate } from 'react-router-dom'
import { UseContext } from '../AppContext/AppContext'

function TopDoctors() {
    const {doctors} = UseContext()

    const navigate=useNavigate()
  return (
    <div className='flex  flex-col  items-center'>
        <h1 className='text-3xl'>Top Doctors List To Book</h1>
        <p className='text-sm text-gray-800 mt-5 '>We help people and people help us to reach us to many people</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,5).map((doctor,index)=>(
                <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px]  transition-all duration-500'>
                    <img className='bg-blue-50' src={doctor.image} alt="" />
                     <div className='p-4'>
                        <div className='flex gap-3 items-center'>
                            <span className='w-3 h-3  rounded-full bg-green-400'></span><p className='text-green-300'>Available</p>
                        </div>
                      <span>{doctor.name}</span> <br />
                      <span className='text-gray-500 text-sm'>{doctor.speciality}</span>
                     </div>

                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-xl'>more </button>
    </div>
  )
}

export default TopDoctors
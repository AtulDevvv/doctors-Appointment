import React, { useEffect, useState } from 'react'
import { UseContext } from '../AppContext/AppContext'
import { useNavigate } from 'react-router-dom'

function RealtedDoctor({docId,speciality}) {

    const {doctors}=UseContext()
const navigate=useNavigate()
    const [realtedDoc,setRealtedDoc]=useState([])

    useEffect(()=>{
        if(doctors.length && speciality){
             const doctorsData=doctors.filter((doc)=>doc.speciality===speciality &&doc._id!=docId )
             setRealtedDoc(doctorsData)
        }

    },[doctors,speciality,docId])

  return (
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
  )
}

export default RealtedDoctor
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseContext } from '../AppContext/AppContext'

function Doctors() {

  const {speciality}=useParams()
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter]=useState(false)

  const navigate=useNavigate()

  const {doctors}=UseContext()


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(()=>{
    applyFilter()


  },[doctors, speciality])

  return (
    <div className='flex gap-4'>
      <div className='flex-col mt-3'>
      <strong className="text-lg font-semibold">Browse through the doctors speciality</strong>
      <br />
      <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filter</button>
      <div className={` ${showFilter?'block':' hidden sm:block'}border-[2px] rounded-lg border-blue-400 outline-double mt-2`}>
        <h3 onClick={()=>speciality==='Genenral physician'?navigate('/doctors'):navigate('/doctors/General physician')}  className='p-2 border border-blue-300  mt-2 rounded-lg bg-blue-200 text-gray-700 hover:bg-blue-300 transition-all duration-500'>Genearl physician</h3>
        <h3 onClick={()=>speciality='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className='p-2 border border-blue-300  mt-2 rounded-lg bg-blue-200 text-gray-700 hover:bg-blue-300 transition-all duration-500'>Gynecologist</h3>
        <h3 onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className='p-2 border border-blue-300  mt-2 rounded-lg bg-blue-200 text-gray-700 hover:bg-blue-300 transition-all duration-500'>Dermatologist</h3>
        <h3 onClick={()=>speciality='Pediatrcians'?navigate('/doctors'):navigate('/doctors/Pediatrcians')} className='p-2 border border-blue-300  mt-2 rounded-lg bg-blue-200 text-gray-700 hover:bg-blue-300 transition-all duration-500'>Pediatrcians</h3>
        <h3 onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className='p-2 border border-blue-300  mt-2 rounded-lg bg-blue-200 text-gray-700 hover:bg-blue-300 transition-all duration-500'>Neurologist</h3>
        <h3 onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className='p-2 border border-blue-300  mt-2 rounded-lg bg-blue-200 text-gray-700 hover:bg-blue-300 transition-all duration-500'>Gastroenterologist</h3>
      </div>
      </div>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
     filterDoc?.map((doctor,index)=>(
      <div key={index} onClick={()=>navigate(`/appointment/${doctor._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px]  transition-all duration-500'>
                    <img className='bg-blue-50' src={doctor.image} alt="" />
                     <div className='p-4'>
                        <div className='flex gap-3 items-center'>
                            <span className='w-3 h-3  rounded-full bg-green-400'></span><p className='text-green-300'>Available</p>
                        </div>
                      <span>{doctor.name}</span> <br />
                      <span className='text-sm text-gray-400'>{doctor.speciality}</span>
                     </div>

                </div>

     ))
        }

      </div>
    </div>
  )
}

export default Doctors
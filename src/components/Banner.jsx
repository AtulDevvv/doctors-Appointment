import React from 'react'
import { assets } from '../assets/asset'
import { useNavigate } from 'react-router-dom';
import { UseContext } from '../AppContext/AppContext';

function Banner() {

  const{token}=UseContext()

    const navigate=useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px14 lg:px-12 my-20 md:mx-10'>

        <div className=' tracking-tighter leading-5 mt-10'>
        <h1 className='mt-4 sm:text-2xl md:text-4xl text-white text-3xl font-semibold'>Book appointment</h1>
            <h1 className='mt-4 sm:text-2xl md:text-4xl text-white text-3xl font-semibold'>With 100+ Trusted Doctors</h1>
            {
              token?<div >
                <h3 className='text-sm mb-2 mt-3 text-gray-100 font-semibold md:text-lg md:mt-7'>😷Your Health, Our Priority – Book Appointments in Seconds! </h3>
                <h3 className='text-sm mb-2 mt-3 text-gray-100 font-semibold md:text-lg md:mt-7'>👨‍⚕️Access Top Doctors Anytime, Anywhere.</h3>
                <h3 className='text-sm mb-2 mt-3 text-gray-100 font-semibold md:text-lg md:mt-7'>🚀Skip the Wait – Your Doctor Is Just a Tap Away.</h3>
                <h3 className='text-sm mb-2 mt-3 text-gray-100 font-semibold md:text-lg md:mt-7'>🩺Find the Right Doctor, Right Now.</h3>
              
              </div>
              :  
               <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='p-2 whitespace-nowrap bg-blue-200 rounded-full text-md text-gray-800 py-3 px-3  hover:scale-105 translate-y-[-10px] transition-all duration-500 font-light mt-5 '>Create Account</button>
            }
         

        </div>


        <div className='hidden md:block md:w-1/2  lg:w-[370px] '>
         <img className='w-full  bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />


        </div>
       

    </div>
  )
}

export default Banner
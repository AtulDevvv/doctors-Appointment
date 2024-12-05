import React from 'react'
import { assets } from '../assets/asset'

function Header() {
  return (
    <div className=' flex  flex-col md:flex-row flex-warp bg-primary  rounded-lg px-6 md:px-10 lg:px-2'>
        <div className='md:w-1/2  flex flex-col items-start justify-center gap-4 py-10 m-auto ml-10 '>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold lg:leading-tight'>Book Appointment <br /> With Trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28 ' src={assets.group_profiles} alt="" />
                <p> Simple browse through our extensive list of trusted dcotors, <br className='hidden sm:block' />schedule your appoinment hassle-free.</p>
            </div>
                <a  className='flex item-center gap-2 bg-white px-3 py-4 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality"><h4 className='whitespace-nowrap text-md font-semibold'>Book appointment</h4><img src={assets.arrow_icon} alt="" /></a>
        </div>
       
       <div className='md:w-1/2 hidden md:block relative'>
       <img className='w-full  absolute bottom-0 h-auto rounded-lg ' src={assets.headDoc1} alt="" />

       </div>

       

    </div>
  )
}

export default Header
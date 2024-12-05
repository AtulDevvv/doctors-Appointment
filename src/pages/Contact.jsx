import React from 'react'
import { assets } from '../assets/asset'

function Contact() {
  return (
    <div className='text-center'>
      <h1 className='text-xl text-gray-700 font-bold'>Contact Us</h1>
      <div className='flex items-center   md:flex-row flex-col md:gap-10 mt-5 '>
        <img className='w-1/2' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-10 mt-32'>
          <span><h4  className='text-lg text-gray-600 font-semibold'>Our Office</h4>
          <p>123 Main Street, City, State, ZIP Code</p></span>
          <span>
          Phone Number: [123-456-7890]
          Email: [contact@clinicname.com]
          </span>

          <h1> CAREERS AT PRESCRIPTO</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, aspernatur.</p>
           <button className='p-3 w-1/2 h-1/2 border border-gray-400 font-light hover:text-xl transition-all ml-20 md:ml-28 duration-500 ease-in-out '> Explore Jobs</button>

        </div>
      </div>
    </div>
  )
}

export default Contact
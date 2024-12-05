import React from 'react'
import { assets } from '../assets/asset'

function Footer() {
  return (
    <div>
        <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        {/* left part */}
        <div className='border shadow-md leading-5 hover:shadow-lg'>
        <img className='w-32' src={assets.logo} alt="" />
            <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit hic dolorem voluptatibus esse debitis sit minus ex, ea libero numquam a eum. Officiis.</p>



        </div>
         {/* center-part */}

        <div className='border shadow-md leading-5 flex flex-col gap-4 justify-center items-center hover:shadow-lg'>
            <p className='text-lg font-semibold'>COMPANY</p>
            <ul>
            <li>Home</li>
            <li>About US</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
            </ul>
           
        </div>
        {/* right-part */}

        <div className='border shadow-md leading-5 hover:shadow-lg flex flex-col justify-center items-center'>
            <p>GET IN TOUCH</p>
            <ul>
                <li>+8219455546</li>
                <li>savers@gmail.com</li>
   
            </ul>

        </div>
    </div>
        {/* copyWrite */}
    <div className='flex justify-center items-center text-gray-600'>
        <hr />
         <p>Copyright 2024@ saver4s -ALl right reserve</p>
    </div>
    </div>
  )
}

export default Footer
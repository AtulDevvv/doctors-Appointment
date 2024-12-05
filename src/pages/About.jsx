import React from 'react'
import { assets } from '../assets/asset'

function About() {
  return (
    <section>
      <div>
        <h1 className='text-center text-xl font-bold text-gray-700'>About US</h1>
      </div>
      <div className='md:flex flex md:flex-row  flex-col items-center jus  gap-10 w-full '>
        <img src={assets.about_image} className='w-[70%] flex-3' alt="" />
        <div className='border border-gray-200 p-2'>
          <p>Welcome to prescripto, where your health and well-being are our top priority. Our team of experienced, compassionate healthcare professionals is dedicated to providing exceptional medical care in a welcoming and comfortable environment.</p>
          <p><h2 className='text-md font-semibold text-gray-600 inline-block '>Our Mission</h2>
          <br />
          At Prescripto, our mission is to deliver personalized healthcare that meets the needs of every patient. We believe in a holistic approach to medicine, where prevention is as important as treatment. Our goal is to help you lead a healthier, more fulfilling life by addressing your medical needs with the highest level of care and professionalism.</p>
          <p> <h2 className='text-md font-semibold text-gray-600 border-b inline-block '>Our Team</h2>
          <br />

           Our clinic is staffed with a team of highly qualified and experienced doctors, specialists, and support staff, each dedicated to providing top-quality healthcare. We take pride in our collaborative approach to healthcare, ensuring that every patient receives the attention and treatment they deserve.</p>
        </div>
       
      </div>
      <div className='text-center mt-20 '>
          <h2 className='text-xl font-semibold text-gray-600' >Why Choose Us</h2>
       <div>
        <span>
          <p><h3 className='text-lg text-gray-500 font-semibold'>Expertise:</h3> Our doctors are leaders in their respective fields, staying at the forefront of medical advancements.</p>
        </span>
        <span>
          <p><h3 className='text-lg text-gray-500 font-semibold'>Personalized Care: </h3> We believe every patient is unique, and we tailor our services to meet your individual needs.</p>
        </span>
        <span>
          <p><h3 className='text-lg text-gray-500 font-semibold'>State-of-the-Art Facility:</h3>Our clinic is equipped with the latest medical technologies to ensure the highest standard of care.</p>
        </span>

       </div>

        </div>

    </section>
  )
}

export default About
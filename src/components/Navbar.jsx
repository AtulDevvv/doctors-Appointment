import React, { useState } from 'react';
import { assets } from '../assets/asset';
import { NavLink, useNavigate } from 'react-router-dom';
import { UseContext } from '../AppContext/AppContext';

function Navbar() {
  const navigate = useNavigate();
  const {token,setToken,userData}=UseContext()

  const [showMenu,setShowMenu]=useState(false)

  const logout= ()=>{
    setToken('')
     localStorage.removeItem('token')


  }
 
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-3 border-b-gray-300 border-b'>
      <img src={assets.logo} alt="logo" />
      <ul className='hidden md:flex items-start gap-5 font-medium uppercase'>
        
        <li className='py-1'>
          <NavLink to='/' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>Home</NavLink>
        </li>
        <li className='py-1'>
          <NavLink to='/doctors' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>All Doctors</NavLink>
        </li>
        <li className='py-1'>
          <NavLink to='/about' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>About</NavLink>
        </li>
        <li className='py-1'>
          <NavLink to='/appointments' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>Appointments</NavLink>
        </li>
        <li className='py-1'>
          <NavLink to='/contact' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>Contact</NavLink>
        </li>
      </ul>
      <div className='flex gap-7 relative'>
        {
            token?<div className='w-10 relative h-10 group  cursor-pointer flex gap-3'>
                <img className='cover rounded-full w-10 h-10' src={userData.image?userData.image:assets.profile_pic} alt="" />
                <img className='w-2 ' src={assets.dropdown_icon} alt="" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block w-32  '>
                    <div className=' bg-stone-100 rounded flex flex-col gap-4  items-start shadow-sm '>
                        <p onClick={()=> navigate('/my-profile')} className='hover:text-gray-800 cursor-pointer ml-2 ' >My profile</p>
                        <p onClick={()=> navigate('/my-appointment')} className='hover:text-gray-800 cursor-pointer ml-2'>My Appointment</p>
                        <p onClick={()=>logout()}  className='hover:text-gray-800 cursor-pointer ml-2'> Logout</p>
                    </div>
                </div>
            </div>:<button onClick={() => navigate('/login')} className='bg-primary text-white rounded-full font-light hidden md:block p-2'>
            Create Account
          </button>
        }
        <img onClick={()=>setShowMenu(true)} className='md:hidden w-6 cursor-pointer' src={assets.menu_icon} alt="" />
        <div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex w-full items-center justify-between ' >
          <img className='w-20' src={assets.logo} alt="" />
          <img className='w-6' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col gap-10 text-xl font-semibold text-gray-900'>
          <li className='py-1' onClick={()=>setShowMenu(false)}>
          <NavLink to='/' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>Home</NavLink>
        </li>
        <li className='py-1' onClick={()=>setShowMenu(false)}>
          <NavLink to='/doctors' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>All Doctors</NavLink>
        </li>
        <li className='py-1' onClick={()=>setShowMenu(false)}>
          <NavLink to='/about' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>About</NavLink>
        </li>
        <li className='py-1' onClick={()=>setShowMenu(false)}>
          <NavLink to='/appointments' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>Appointments</NavLink>
        </li>
        <li className='py-1' onClick={()=>setShowMenu(false)}>
          <NavLink to='/contact' className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }>Contact</NavLink>
        </li>

          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;

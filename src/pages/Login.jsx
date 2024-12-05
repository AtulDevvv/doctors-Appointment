import React, { useState } from 'react'
import { UseContext } from '../AppContext/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const {backendUrl,token,setToken}=UseContext()

  const [state,setState]=useState('sign-up')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('');
  const [name,setName]=useState('')

  const navigate=useNavigate();

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
      if(state==='sign-up'){
        const {data}=await axios.post(`${backendUrl}/api/user/register`,{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          navigate('/')


        }else{
          toast.error(data.message)


        }

      }else{
        const {data}=await axios.post(`${backendUrl}/api/user/login`,{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          navigate('/')


        }else{
          toast.error(data.message)


        }


      }

    }
    catch(error){
      toast.error(error.message)


    }

  }

  return (
    <form onSubmit={onSubmitHandler} action="" className=' min-h-[100px] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[320px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
        <div className='w-full flex items-center  flex-col'> <p className='text-lg font-semibold'>{state === 'sign-up' ? 'Create Account' : 'Login'}</p>
        <p className='text-md'>  to book appointment</p></div>
       
   
     <div>
     <p>Full name</p>
     <input className='outline-none border border-blue-200 rounded-lg' type="text" onChange={(e)=>setName(e.target.value)} />
     </div>
     <div>
     <p>Email</p>
     <input  className='outline-none border border-blue-200 rounded-lg max-w-full text-gray-600' type="email" onChange={(e)=>setEmail(e.target.value)} />
     </div>
     <div>
     <p>password</p>
     <input  className='outline-none border border-blue-200 rounded-lg' type="password" onChange={(e)=>setPassword(e.target.value)} />
     </div>

     <button className='m-auto bg-primary text-white  rounded-full p-2 px-10'>{state==='sign-up '?'Create Account':'Login'}</button>

   { state==='sign-up' ?  <h4>Already have account?<span className='underline text-blue-400 text-sm cursor-pointer' onClick={()=>{setState('sign-in')
 
      }}>Click here</span></h4>: <h4>Create Account  <span className='underline text-sm text-blue-300 cursor-pointer' onClick={()=>setState('sign-up')}>Click here</span></h4>}

     </div>

    </form>
  )
}

export default Login
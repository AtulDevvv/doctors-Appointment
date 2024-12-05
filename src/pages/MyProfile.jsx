import React, { useState } from 'react'
import { assets } from '../assets/asset'
import { UseContext } from '../AppContext/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyProfile() {

const {userData,setUserData,token,loadUserProfileData,backendUrl}=UseContext()
const [image,setImage]=useState(false)
const [isEdit,setEdit]=useState(false);

const updateUserProfile=async()=>{

  try{
    const formData= new FormData()
    formData.append('name',userData.name)
    formData.append('phone',userData.phone)
    formData.append('address',JSON.stringify(userData.address))
    formData.append('gender',userData.gender)
    formData.append('dob',userData.dob)
  
    image && formData.append('image',image)

    const {data}=await axios.post(`${backendUrl}/api/user/update-profile`,formData,{headers:{token}})

    if(data.success){
      toast.success(data.message)
      await loadUserProfileData()

      setEdit(false)
      setImage(false)
    }else{
      toast.error(data.message)
    }


  }
  catch(err){
    toast.error(err.message)

  }

}

console.log(userData)


  return userData &&  (
    <div className='flex max-w-lg  flex-col gap-2 text-sm '>
      {
        isEdit?<label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-40 opacity-75 ' src={image?URL.createObjectURL(image):userData.image} alt="" />
            <img className='w-10 h-10 absolute bottom-12 right-12 border border-gray-300 '  src={image?'':assets.upload_icon} alt="" />
          </div>
          <input type="file" id="image" hidden onChange={(e)=>setImage(e.target.files[0])} />
          

        </label>:<img className='w-36 rounded' src={userData.image} alt="" />
      }
      
      {
        isEdit?<input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' value={userData.name} onChange={(e)=>setUserData((prevData)=>({...prevData, name:e.target,value}))} type="text" />:<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr />
      <div>
        <p className='text-3xl text-gray-600'>Contact Information</p>
        <div className='flex flex-col'>
          <span>Email id:</span>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='text-medium text-gray-500'>phone:</p>
          {
        isEdit?<input value={userData.phone} onChange={(e)=>setUserData((prevData)=>({...prevData, phone:e.target.value}))} type="text" />:<p className='text-blue-500'>{userData.phone}</p>

      }
      <span className='text-medium text-gray-500'>Address:</span>
      {
        isEdit?<p className=''>
          <input value={userData.address.line1} className='border border-gray-400 outline-none'  onChange={(e)=>setUserData((prevData)=>({...prevData,adrress:{line1:e.target.value }}))} type="text" />

          <br />
          <input value={userData.address.line2} className='border border-gray-400 outline-none focus:border-gray-700' onChange={(e)=>setUserData((prevData)=>({...prevData,address:{line2:e.target.value }}))} type="text" />
        </p>:<p>
          <p className='text-blue-500'>{userData.address.line1}</p>
          <br />
          <p className='text-blue-500'>{userData.address.line2}</p>
        </p>
      }

        </div>

      </div>
      <div>
        <p className='text-xl text-gray-600'>Basic Information</p>
        <div>
          <span className='text-medium text-gray-500'>Gender:</span>
          {
            isEdit?<select onChange={(e)=>setUserData((prevData)=>({...prevData,gender:e.target.value}))}>
              <option value="male">Male</option>
              <option value="female">female</option>
            </select>:<span>{userData.gender}</span>
          }
          <br />
          <span className='text-medium text-gray-500'>BirthDay:</span>
          {
            isEdit?<input type='date' onChange={(e)=>setUserData((prevData)=>({...prevData,dob:e.target.value}))}/>:<h4 className='text-blue-500'>{userData.dob}</h4>
          }
        </div>

      </div>
      <div>
        {isEdit?<button   className='p-2 px-6 bg-primary text-white rounded-full'  onClick={updateUserProfile}>Save Information</button  >:<button   className='p-2 bg-primary px-6 text-white rounded-full'  onClick={()=>setEdit(true)}>Edit</button>}
      </div>

    </div>
  )
}

export default MyProfile
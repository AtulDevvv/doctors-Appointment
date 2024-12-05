import { createContext, useContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'



 export const AppContext=createContext()
 

  const AppContextProvider=({children})=>{
    let currencySymbol='Rs'
     const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const [userData,setUserData]=useState(false);

    const[doctors,setDoctors]= useState([])
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
console.log(token)
  
 

   const getDoctorsData=async ()=>{
     try{
      const {data}= await axios.get(`${backendUrl}/api/doctor/list`)
      if(data.success){
         setDoctors(data.doctors)
      }else{
        toast.error(data.message)

      } 

     }
     catch(error){
      toast.error(error.message)

     }
   }

   const loadUserProfileData=async()=>{
    try{

      const{data}= await axios.get(`${backendUrl}/api/user/get-profile`,{headers:{token}})
      if(data.success){
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)

    }
   }

   const value={
    doctors:doctors,
    currencySymbol,
    getDoctorsData,
    token,setToken,
    userData,setUserData,loadUserProfileData,
    backendUrl
   }

   useEffect(()=>{
    getDoctorsData()

   },[])

   useEffect(()=>{
if(token){
  loadUserProfileData()

}else{
  setUserData(false)
}

   },[token])


   return (
    <AppContext.Provider value={value}>
        {children}

    </AppContext.Provider>
   )
  }

  export default AppContextProvider

  export const UseContext=()=>{
    return useContext(AppContext)
  }

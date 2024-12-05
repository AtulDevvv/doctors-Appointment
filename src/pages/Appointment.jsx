import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseContext } from '../AppContext/AppContext'
import { assets } from '../assets/asset';
import RealtedDoctor from '../components/RealtedDoctor';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointment() {

  const {docId}=useParams()
  const {doctors,token,backendUrl,getDoctorsData}=UseContext();

  const [docInfo, setDocInfo]=useState();

  const [docSlots,setDocSlots]=useState()
  const[slotIndex,setSlotIndex]=useState(1);
  const [slotTime,setSlotTime]=useState()

  const navigate=useNavigate()

  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const currentTime=new Date()
  console.log(currentTime)
  
  const fecthDocInfo=async()=>{
     const docInfo=doctors.find(doc=>doc._id===docId)
     setDocInfo(docInfo)

  }

  const getAvailableSlots=async ()=>{
    setDocSlots([])

    let today=new Date()
     
     for(let i=0;i<7;i++){

      let currentDate=new Date(today)
      currentDate.setDate(today.getDate()+i)


      let endTime=new Date()
       endTime.setDate(today.getDate()+i)
       endTime.setHours(21,0,0,0)

       if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+  1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)

        
       }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)

       }
       let timeSlots=[]

       while(currentDate<endTime){

        let formatedTime=currentDate.toLocaleTimeString([],{hour:"2-digit",minute:'2-digit'})

         let day= currentDate.getDate()
      let month=  currentDate.getMonth()+1
      let year=   currentDate.getFullYear()
        const slotDate= day+"_"+month+"_"+year
         const slotTime= formatedTime;
         
         const isSlotAvailable= docInfo?.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)?false:true;
         if(isSlotAvailable){
           timeSlots.push({
             datetime:new Date(currentDate),
             time:formatedTime
           })
         }


        currentDate.setMinutes(currentDate.getMinutes()+30)

       }

       setDocSlots(prev=>([...prev,timeSlots]))


       

     }
     

  }

  useEffect(()=>{
    fecthDocInfo()

  },[doctors,docId])

  useEffect(()=>{
        getAvailableSlots()
  },[docInfo])



  // console.log("the sl;ots is"+docSlots)
  const bookAppointment=async ()=>{
    if(!token){
      toast.warn('Login to book Appointment')
      return navigate('/login')

    }
    
    try{
    
      const date= docSlots[slotIndex][0].datetime;
      // console.log( " the doc slots is "+docSlots)
      console.log(date)

      let day= date.getDate()
      let month= date.getMonth()+1
      let year= date.getFullYear()

      const slotDate= day+'_'+month+'_'+year;

      const {data}= await axios.post(`${backendUrl}/api/user/book-appointment`,{docId,slotDate,slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData();
        navigate('/my-appointment')

      }else{
        toast.error(data.message)
      }

    }
    catch(err){
      console.log(err)
      toast.error(err.message)
      
    }

  }
  console.log(slotTime)


  return docInfo && (
    <div>
      <div className=' flex flex-col sm:flex-row gap-4'>

     
       {/* doctor details */}
        <div>
          <img className='bg-primary w-full sm:max-w-72  rounded-lg  ' src={docInfo.image} alt="" />


        </div>
        
      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0'>
        <p className='flex items-center gap-2 text-2xl '>
        <h2>{docInfo.name}</h2>
        <img className='w-5' src={assets.verified_icon} alt="" />
        </p>
        <div>
          <p className='flex  items-center gap-3 text-sm mt-1 text-gray-600'>
            {docInfo.degree}-{docInfo.speciality}
            <button className='py-0.5 px-2 border text-xs rounded-full  '>{docInfo.experience}</button>
          </p>
        </div>
        
        {/* doctor about */}
        <div className=''>
          <p className='flex items-center gap-1 text-sm font-semibold mt-2'> About <img src={assets.info_icon} alt="" /></p>
          <p className='text-sm text-gray-700 mt-2'>{docInfo.about}</p>

        </div>
        <span className='mt-3 inline-block' ><strong> Appointment fees:Rs.</strong><big className='ml-2'>{docInfo.fees}</big></span>


      </div>
      </div> 
    <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
      <h3>Booking slots</h3>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots.map((item,index)=>(
            <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border-gray-600 border'}`}>
               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
               <p>{item[0] && item[0].datetime.getDate()}</p>

            </div>
          ))
        }

      </div>
      <div className='flex mt-10 gap-3 overflow-x-scroll p-6 '>
        {docSlots.length && docSlots[slotIndex].map((item,index)=>(
          <span onClick={()=>{setSlotTime(item.time)}}className={`inline-block whitespace-nowrap p-1 ${
            item.time === slotTime ? 'bg-primary text-white' : ''
          } border border-gray-500 rounded-2xl`} key={index}>
            {item.time.toLowerCase()}
          </span>



        ))}
      </div>
      <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'> Book an appointment</button>

    </div>
    <RealtedDoctor docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { UseContext } from '../AppContext/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

function MyAppointments() {
  const { backendUrl, token, getDoctorsData } = UseContext();
  const [appointments, setAppointments] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const months = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const navigate = useNavigate();

  const getuserAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointment.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        setClientSecret(data.clientSecret);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      toast.error('Failed to create payment intent.');
    }
  };

  useEffect(() => {
    if (token) {
      getuserAppointment();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <Elements stripe={stripePromise}>
      <div className="p-6 relative bg-white min-w-full rounded-lg shadow-md">
        <h2 className="text-gray-700 text-3xl font-bold border-b pb-3 mb-4">My Appointments</h2>
        <div>
          {appointments?.map((item, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[1fr_2fr_1fr] gap-4 sm:gap-6 border-b py-4 items-center"
              key={index}
            >
              <div className="flex justify-center sm:justify-start">
                <img
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl font-semibold text-gray-900">{item.docData.name}</p>
                <p className="text-gray-600">{item.docData.speciality}</p>
                <p className="text-gray-500">Address:</p>
                <p className="text-gray-500">{item.docData.address.line1}</p>
                <p className="text-gray-500">{item.docData.address.line2}</p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                {!item.cancelled && !item.isCompleted && item.payment && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Paid</button>} 
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentStripe(item._id)} className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted &&!item.payment && <button onClick={()=>cancelAppointment(item._id)} className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Cancel appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
                
              </div>
            </div>
          ))}
        </div>
        

        {clientSecret && (
          <div className='absolute flex-col gap-10 flex justify-center items-center top-0 w-full h-full bg-gray-300 bg-opacity-30 backdrop-blur-sm  '>
            <h1 className='text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-primary'> Payment your appointment fees here.</h1>
            <div className='w-1/2 bg-gray-300 bg-opacity-70 backdrop-blur-sm '>

          <PaymentForm className='w-[200px]'
            clientSecret={clientSecret}
            onSuccess={() => {
              setClientSecret(null);
              getuserAppointment();
            }}
          />
            </div>
          </div>
        )}
        
      </div>
    </Elements>
  );
}

const PaymentForm = ({ clientSecret, onSuccess }) => {
  const { backendUrl, token } = UseContext();

  const stripe = useStripe();
  const elements = useElements();

  const verifyStripePayment = async (paymentIntentId) => {
    try {
      const {data} = await axios.post(
        `${backendUrl}/api/user/verifyStripe`,
        { paymentIntentId },
        { headers: { token } }
      );

      console.log(data)
      if (data.success) {
        toast.success(data.message);
        onSuccess(); // Refresh appointments or update UI
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error verifying payment:', error.message);
      toast.error('Payment verification failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: 'Appointment Payment' },
      },
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === 'succeeded') {
     
      await verifyStripePayment(paymentIntent.id); // Call backend verification
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default MyAppointments;

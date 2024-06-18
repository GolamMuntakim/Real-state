
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
// import '../Form/CheckoutForm.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const Checkout = ({closeModal,bookingInfo, refetch}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState('')
  const[processing, setProcessing] = useState(false)
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()

  useEffect(()=>{
    //fetch client secret
    if(bookingInfo?.price && bookingInfo?.price>1){
        getClientSecret({price: bookingInfo?.price})
    }
  },[bookingInfo?.price])
  //get client secret
  const getClientSecret = async price =>{
    const {data} = await axiosSecure.post('/create-payment-intent', price)
    console.log('client secret from server ',data)
    setClientSecret(data.clientSecret)

  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
      setProcessing(false)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError('')
    }
    //confirm client payment
   const {error: confirmError, paymentIntent} =  await stripe.confirmCardPayment(clientSecret, {
    payment_method : {
        card : card,
        billing_details : {
            email : user?.email,
            name: user?.displayName,
        }
    }
})
if(confirmError){
    console.log(confirmError)
    setCardError(confirmError.message)
    setProcessing(false)
    return
}

  if(paymentIntent.status === 'succeeded'){
    console.log(paymentIntent)
    // 1.create payment into object
    const paymentInfo = {
      ...bookingInfo,
      propertyId : bookingInfo._id ,
      transactionId : paymentIntent.id,
      date : new Date()
    }
    delete paymentInfo._id
    console.log(paymentInfo)
    try{
       // 2. save payment info in booking collection (db)
       const {data} = await axiosSecure.post('/booking', paymentInfo)
       console.log(data)
    // 3. change room status to booked in db
     await axiosSecure.patch(`/property/status/${bookingInfo?._id}`,{transactionId:paymentIntent.id})
    //update ui
    refetch()
    // closeModal(true)
    toast.success('Congratulation, you have buy the land')
    navigate('/')
    }catch(err){
      console.log(err)
    }
  }
  setProcessing(false)
  };

  return (
   <>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {/* <button type="submit" >
        Pay
      </button> */}
      <div className='flex mt-2 justify-around'>
                <button
                      type='submit'
                      disabled={!stripe || !clientSecret || processing}
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    >
                
                      Pay ${bookingInfo?.price}
                    </button>
                    <button
                      type='button'
                      onClick={()=>closeModal(null)}
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-8
                      00 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                      Cancel
                    </button>
                   
                  </div>
    </form>
    {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
   </>
  );
};

export default Checkout
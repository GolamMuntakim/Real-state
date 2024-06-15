
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/react'
  import  { Fragment, useState } from 'react'
  
 
  
  
  import toast from 'react-hot-toast'

  import useAxiosSecure from '../hooks/useAxiosSecure'

import OfferModalForm from './OfferModalForm'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
  
  const OfferModal = ({ propertys, setPropertys,  refetch}) => {
    const { user } = useAuth()
      const axiosSecure =  useAxiosSecure()
      const [loading, setLoading] = useState(false)
      const [propertyData, setPropertyData] = useState(propertys)
     
      const [value, onChange] = useState(new Date());
      console.log(propertyData)


    const handleOfferSubmit = async e =>{
        e.preventDefault()
        setLoading(true)
        const form = e.target 
        // const id = propertyData?._id
        const location = form.location.value 
        const title = form.title.value 
        const price = form.price.value 
        const agent = form.name.value
        const image = propertyData?.image
        const status = "pending"
        const guest = {
            name : user?.displayName,
            image : user?.photoURL,
            email:user?.email,
           
        }
        try{
            const OfferedData = { location, title,price,status,agent,guest,image,date: value}
            const {data} = await axiosSecure.post(`/offered/${e._id}`, OfferedData)
            console.log(data)
            refetch()
            // setIsEditModalOpen(false)
            setPropertys(null)
            setLoading(false)
            toast.success('Your Offer sent succesfully')
            console.table(OfferedData)
          
            //post request to server
            // await mutateAsync(OfferedData)
        }catch(err){
            console.log(err)
            toast.error(err.message)
           
        }
    
        
    }
  
    return (
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setPropertys(null)}
        >
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </TransitionChild>
  
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <DialogTitle
                    as='h3'
                    className='text-lg font-medium text-center leading-6 text-gray-900'
                  >
                    Make An Offer
                  </DialogTitle>
                  <div className='mt-2 w-full'>
                      {/* Update room form */}
                      <OfferModalForm
                      onChange={onChange}
                      handleOfferSubmit={handleOfferSubmit}
                      value={value} 
                      propertyData={propertyData}
                      loading={loading} 
                      setLoading={setLoading}
                      setPropertyData={setPropertyData}
                        ></OfferModalForm>
                      </div>
                  <hr className='mt-8 ' />
                  <div className='mt-2 '>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900 focus-visible:ring-offset-2'
                      onClick={() => setPropertys(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
  
  
  
  export default OfferModal
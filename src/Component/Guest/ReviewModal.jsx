
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/react'
  import { Fragment, useState } from 'react'
  
  
  import toast from 'react-hot-toast'

  import useAxiosSecure from '../hooks/useAxiosSecure'

import ReviewModalForm from './ReviewModalForm'
import useAuth from '../hooks/useAuth'
  
  const ReviewModal = ({ setIsEditModalOpen, isOpen , property, refetch}) => {
    const {user} = useAuth()
      const axiosSecure =  useAxiosSecure()
      const [loading, setLoading] = useState(false)
      const [propertyData, setPropertyData] = useState(property)
      const [value, onChange] = useState(new Date());
      console.log(propertyData)
      const handleReviewSubmit = async e =>{
        e.preventDefault()
        setLoading(true)
        const form = e.target 
        const title = form.title.value 
        const description = form.description.value 
        const agent = form.name.value
        const reviewrImage = user?.photoURL
        const reviewerName = user?.displayName 
        const reviewerEmail = user?.email
       
        try{
            const reviewData = { description, title,agent,date: value,reviewrImage,reviewerName,reviewerEmail}
            const {data} = await axiosSecure.post(`/review/${e._id}`, reviewData)
            console.log(data)
            refetch()
            // setIsEditModalOpen(false)
            setIsEditModalOpen(false)
            setLoading(false)
            toast.success('Thanks for your feedback')
            console.table(reviewData)
          
            //post request to server
            // await mutateAsync(OfferedData)
        }catch(err){
            console.log(err)
            toast.error(err.message)
           
        }
    
        
    }
  
    return (
        <Transition appear show={isOpen}  as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setIsEditModalOpen(false)}
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
                    Review
                  </DialogTitle>
                  <div className='mt-2 w-full'>
                      {/* Update room form */}
                      <ReviewModalForm
                      onChange={onChange}
                      handleReviewSubmit={handleReviewSubmit}
                      value={value} 
                      propertyData={propertyData}
                      loading={loading} 
                      setLoading={setLoading}
                      setPropertyData={setPropertyData}
                        ></ReviewModalForm>
                      </div>
                  <hr className='mt-8 ' />
                  <div className='mt-2 '>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900 focus-visible:ring-offset-2'
                      onClick={() => setIsEditModalOpen(false)}
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
  
  
  
  export default ReviewModal
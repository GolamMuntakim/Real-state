
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'


import toast from 'react-hot-toast'
import { imageUpload } from '../../api/utilities'
import useAxiosSecure from '../hooks/useAxiosSecure'
import UpdateForm from './UpdateForm'

const UpdateModal = ({ setIsEditModalOpen, isOpen , property, refetch}) => {
    const axiosSecure =  useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [propertyData, setPropertyData] = useState(property)
    const [imageText, setImageText] = useState('upload  Image')

    //handle image update
    const handleImage = async image =>{
       setLoading(true)
       try{
        //upload image
        const image_url = await imageUpload(image)
        console.log(image_url)
        setPropertyData({...propertyData, image: image_url })
        setImageText(image.name)
        setLoading(false)

       }catch(err){
        console.log(err)
        toast.error(err.message)
       }
    }

    
    const handleSubmit = async e =>{
        setLoading(true)
        e.preventDefault()
        const updatedPropertyData = Object.assign({}, propertyData)
        delete updatedPropertyData._id 
        console.log(updatedPropertyData)
        try{
            const {data} = await axiosSecure.put(`/property/update/${property?._id}`, updatedPropertyData)
            console.log(data)
            refetch()
            setIsEditModalOpen(false)
            setLoading(false)
            toast.success('Data updated succesfully')
        }catch(err){
            console.log(err)
            setLoading(false)
            toast.error(err.message)
        }
    }

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                  Update Property Info
                </DialogTitle>
                <div className='mt-2 w-full'>
                    {/* Update room form */}
                    <UpdateForm 
                    handleSubmit={handleSubmit} 
                    propertyData={propertyData}
                      loading={loading} 
                      handleImage={handleImage}
                      setPropertyData={setPropertyData}
                      imageText={imageText}
                      ></UpdateForm>
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



export default UpdateModal
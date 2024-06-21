import { useNavigate } from "react-router-dom"
import { imageUpload } from "../../../api/utilities"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { FaSpinner } from "react-icons/fa6"


const AddRoomForm = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const {user } = useAuth()
    const [imageText, setImageText] = useState('upload property Image')


    //get data from server side 
    const {mutateAsync} = useMutation({
        mutationFn : async (propertyData)=>{
            const {data} = await axiosSecure.post(`/property`, propertyData)
            return data
        },
        onSuccess : ()=>{
            console.log('Data saved successfully')
            toast.success('Property added successfully')
            navigate('/dashboard/my-added')
            setLoading(false)
        }
    })

    const handleSubmit = async e =>{
        e.preventDefault()
        setLoading(true)
        const form = e.target 
        const email = user?.email
        const location = form.location.value 
        const title = form.title.value 
        const price = form.price.value 
        const status = "pending"
        // const add ="wishlist"
        const image = form.image.files[0]
        const agent = {
            name : user?.displayName,
            image : user?.photoURL,
            email:user?.email,
           
        }
        try{
            const image_url = await imageUpload(image)
            const propertyData = {
                location, title,price,status,image:image_url ,agent,email
            }
            console.table(propertyData)

            //post request to server
            await mutateAsync(propertyData)
        }catch(err){
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }
        
    }
       //handle image change 
       const handleImage = image=>{
        setImageText(image.name)
    }



  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className=''>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='location' className='block text-gray-600'>
                Property Location*
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-500 rounded-md '
                name='location'
                id='location'
                type='text'
                placeholder='Location'
                required
              />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
               Property Title*
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-500 rounded-md '
                name='title'
                id='title'
                type='text'
                placeholder='Title'
                required
              />
            </div>

            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600'>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price'
                  required
                />
              </div>
              <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
              <div className='file_upload px-5 py-3 relative  rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                  
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      onChange={e=>handleImage(e.target.files[0])}
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                    {imageText.length>20? imageText.split('.')[0].slice(0,15)+'....'+imageText.split('.')[1] : imageText}
                    </div>
                    </label>
                </div>
              </div>
            </div>
            </div>

            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='bedrooms' className='block text-gray-600'>
                  Agent Name
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='name'
                  id='agentname'
                  type='text'
                  value={user?.displayName || ""}
                  placeholder='Agent Name'
                  readOnly
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='bathrooms' className='block text-gray-600'>
                  Agent Email
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='email'
                  id='agentemail'
                  type='text'
                  value={user?.email || ""}
                  placeholder='Agent Email'
                  readOnly
                />
              </div>
            </div>

          </div>
        </div>

        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
        >
             {loading? <FaSpinner className='animate-spin m-auto'/> : '  Add Property'}
        
        </button>
      </form>
    </div>
  )
}

export default AddRoomForm
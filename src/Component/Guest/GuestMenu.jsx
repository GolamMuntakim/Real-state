import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'


// import HostModal from '../../../Modal/HostModal'
import toast from 'react-hot-toast'

import { useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'
import MenuItem from '../DashboardItem/MenuItem'



const GuestMenu = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [role] = useRole()
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const closeModal = () =>{
//     setIsModalOpen(false)
//   }

//   const modalHandler = async()=>{
//     console.log('i want to become a host')
//     closeModal()
//     try{
//       const currentUser = {
//         email : user?.email,
//         role : 'guest',
//         status: 'Requested',
//       }
//       const {data} = await axiosSecure.put(`/user`, currentUser)
//       console.log(data)
//       if(data.modifiedCount>0){
//         toast.success('success! please wait for admin confirmation')
//       }else{
//         toast.error(' please wait for admin approval')
//       }
  
//     }catch(err){
//       console.log(err)
//       toast.error(err.message)
//     }finally{
//       closeModal()
//     }
//   }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Wishlist'
        address='my-wishlist'
      />
      <MenuItem
        icon={BsFingerprint}
        label='Property brought'
        address='property-brought'
      />
      <MenuItem
        icon={BsFingerprint}
        label='My Reviews'
        address='reviews'
      />

     {/* {
      role === 'guest' && (
        <div onClick={()=> setIsModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

      </div>
      )} */}
        {/* <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler}></HostModal> */}
    </>
  )
}

export default GuestMenu
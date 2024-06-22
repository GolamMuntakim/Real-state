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
  
  return (
    <>
    <MenuItem
        icon={BsFingerprint}
        label='My Statistics'
        address='/dashboard'
      />
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

    </>
  )
}

export default GuestMenu
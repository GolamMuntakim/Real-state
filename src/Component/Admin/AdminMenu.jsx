import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../DashboardItem/MenuItem'


const AdminMenu = () => {
  return (
    <>
    <MenuItem icon={FaUserCog} label='Admin Statastics' address='/dashboard' />
      <MenuItem icon={FaUserCog} label='Manage Property' address='manage-property' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Manage Reviews' address='manage-reviews' />
      <MenuItem icon={FaUserCog} label='Advertise Property' address='advertise' />
    </>
  )
}

export default AdminMenu
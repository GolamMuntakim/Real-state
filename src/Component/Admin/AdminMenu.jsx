import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../DashboardItem/MenuItem'


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Property' address='manage-property' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu

import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address}) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-500   hover:text-black ${
          isActive ? 'bg-blue-500  text-black' : 'text-black'
        }`
      }
    >
     
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}


export default MenuItem
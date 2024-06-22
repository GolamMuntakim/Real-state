import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import useAuth from '../Component/hooks/useAuth'
import { Link, NavLink } from 'react-router-dom'
import MenuItem from './DashboardItem/MenuItem'
import AgentMenu from './DashboardItem/AgentMenu'
import useRole from './hooks/useRole'
import GuestMenu from './Guest/GuestMenu'
import AdminMenu from './Admin/AdminMenu'


const Sidebar = () => {
//   const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()
  console.log(role, isLoading)
  const [toggle, setToggle] = useState(true)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  const toggleHandler= event =>{
    console.log(event.target.checked)
    setToggle(event.target.checked)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
             Real State
            </Link>
          </div>
         
        </div>
        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-blue-500 mx-auto'>
              <Link to='/'>
               Home
              </Link>
            </div>
            <br />
          </div>
          <div>
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blue-500   hover:text-black ${
                isActive ? 'bg-blue-500  text-black' : 'text-black'
              }`
            }
          >
            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              {/* <MenuItem label="Add Property" address='/add-property' icon={BsGraphUp}></MenuItem> */}
            
             {role === 'guest' && <GuestMenu></GuestMenu>} 
             {role === 'agent' && <AgentMenu className="bg-[#F1E5D1]"></AgentMenu>}
            {/* <AdminMenu></AdminMenu> */}
             {role === 'admin' && <AdminMenu></AdminMenu>}
            
             
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          {/* <MenuItem label="Profile" address='/dashboard/profile' icon={FcSettings}></MenuItem> */}
          
          
        </div>
      </div>
    </>
  )
}

export default Sidebar
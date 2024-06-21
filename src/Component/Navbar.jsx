import { Link } from "react-router-dom";
import Container from "./Container";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import logo from '../../public/images/ani_logo.json'
import Lottie from 'lottie-react'
import avatar from '../../public/images/placeholder.jpg'
import banner from  '../../public/images/banner.png'
import bannerpic from '../../public/images/bannerpic.png'

const Navbar = () => {
    const {user ,logOut} = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState(()=>{
      return localStorage.getItem('theme') || 'light';
  })
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme', theme)
}, [theme])
const handleToggle = e => {
    setTheme(prevTheme=>(prevTheme==='light' ? 'dark' : 'light'))
   
}
    return (
       <>
      <div className='relative'>
    
    
     <div className='bg-[#29A3FE] w-full  z-40 border-none  '>
        <div className='py-4 '>
          <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0 '>
              {/* Logo */}
             <div className="flex items-center">
             <Link to='/'>
                <Lottie className="h-16 hidden lg:flex" animationData={logo}></Lottie>
              </Link>
              <h2 className="font-bold text-2xl">Real State</h2>
              <div>
              <label className="swap swap-rotate ">

{/* this hidden checkbox controls the state */}
<input 
onChange={handleToggle}
 type="checkbox" className="theme-controller" />

{/* sun icon */}
<svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

{/* moon icon */}
<svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

</label>
              </div>
             </div>
             
             <div className="flex gap-4 font-bold text-white">
             <div>
              <Link to='/'>Home</Link>
             </div>
             <div>
             <Link to='all-properties'>All properties</Link>
             </div>
             
             </div>
            
              {/* Dropdown Menu */}
              <div className='relative'>
                <div className='flex flex-row items-center gap-3'>
                
                  <div className='hidden md:block'>
                    {/* {!user && ( */}
                      <div
                        
                        className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                      >
                       {user?.displayName}
                      </div>
                    {/* )} */}
                  </div>
                  
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition z-20'>
                    {/* <AiOutlineMenu /> */}
                    <div className='hidden md:block'>
                      {/* Avatar */}
                      <img
                        className='rounded-full'
                        referrerPolicy='no-referrer'
                        src={user && user.photoURL ? user.photoURL : avatar}
                        alt='profile'
                        height='30'
                        width='30'
                      />
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm z-40'>
                    <div className='flex flex-col cursor-pointer '>
                      <Link
                        to='/'
                        className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Home
                      </Link>
  
                      {user ? (
                        <>
  
                          <Link
                            to='/dashboard'
                            className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Dashboard
                          </Link>
  
  
  
                          <div
                            onClick={logOut}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to='/login'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Login
                          </Link>
                          <Link
                            to='/signup'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
         
          
        </div>
      </div>
     
     
      </div>
       </>
    );
};

export default Navbar;
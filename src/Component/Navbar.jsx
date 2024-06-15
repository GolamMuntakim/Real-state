import { Link } from "react-router-dom";
import Container from "./Container";
import useAuth from "./hooks/useAuth";
import { useState } from "react";
import logo from '../../public/images/ani_logo.json'
import Lottie from 'lottie-react'
import avatar from '../../public/images/placeholder.jpg'

const Navbar = () => {
    const {user ,logOut} = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className=' w-full bg-blue-500 z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
          <Container>
            <div className='flex flex-row  items-center justify-between gap-3 md:gap-0 '>
              {/* Logo */}
             <div className="flex items-center">
             <Link to='/'>
                <Lottie className="h-16" animationData={logo}></Lottie>
              </Link>
              <h2 className="font-bold text-2xl">Real State</h2>
             </div>
            
              {/* Dropdown Menu */}
              <div className='relative'>
                <div className='flex flex-row items-center gap-3'>
                  {/* Become A Host btn */}
                  <div className='hidden md:block'>
                    {/* {!user && ( */}
                      <div
                        // disabled={!user}
                        // onClick={()=> setIsModalOpen(true)}
                        className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                      >
                       {user?.displayName}
                      </div>
                    {/* )} */}
                  </div>
                  {/* Modal */}
                  {/* <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler}></HostModal> */}
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
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
                  <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
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
    );
};

export default Navbar;
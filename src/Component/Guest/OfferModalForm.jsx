import { useState } from "react";
import useAuth from "../hooks/useAuth"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";



const OfferModalForm = ({ handleOfferSubmit,onChange,value, setPropertyData, propertyData,setLoading }) => {
   
    const { user } = useAuth()
   
    return (
        <>
            {/* <input type="file" name="" id="" /> */}
            <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
                <form onSubmit={handleOfferSubmit}>
                    <div className='grid grid-cols-1 gap-10'>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-black'>
                                Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                value={propertyData?.title}
                                onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                                placeholder='Title'
                                readOnly
                            />
                        </div>


                        {/* <input type="file" /> */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Location
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                name='location'
                                id='location'
                                type='text'
                                value={propertyData?.location}
                                onChange={(e) => setPropertyData({ ...propertyData, location: e.target.value })}
                                placeholder='Location'
                                readOnly
                            />
                        </div>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='name' className='block text-gray-600'>
                                Agent Name
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                name='name'
                                id='name'
                                type='text'
                                value={propertyData?.agent.name || ""}
                                placeholder='Agent Name'
                                readOnly
                            />
                        </div>
                        <div className='flex items-center justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Offer Price
                                </label>
                                <input
                                    className='w-[400px] px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='price'
                                    id='price'
                                    type='number'
                                    value={propertyData?.price}
                                    onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                                    placeholder='Price'
                                    required
                                />
                               
                            </div>
                            
                        </div>
                        <div >
                            <label htmlFor='Date' className='block text-gray-600'>
                                  Offered Date
                                </label>
                                    <DatePicker className="h-12 w-full border-blue-300 focus:outline-blue-500 rounded-md" onChange={onChange} value={value} />
                                </div>
                        <div className="flex gap-4">
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bedrooms' className='block text-gray-600'>
                                    Buyer Name
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='buyername'
                                    id='buyername'
                                    type='text'
                                    value={user?.displayName || user?.name}
                                    placeholder='Buyer Name'
                                    readOnly
                                />
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bedrooms' className='block text-gray-600'>
                                    Buyer Email
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='buyeremail'
                                    id='buyeremail'
                                    type='text'
                                    value={user?.email}
                                    placeholder='Buyer email'
                                    readOnly
                                />
                            </div>
                        </div>



                    </div>

                    <button
                        type='submit'
                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-800'
                    >
                        Make an offer
                    </button>
                </form>
            </div>
        </>
    )
}

export default OfferModalForm
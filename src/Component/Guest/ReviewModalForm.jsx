import { useState } from "react";
import useAuth from "../hooks/useAuth"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";



const ReviewModalForm = ({ handleReviewSubmit,onChange,value, setPropertyData, propertyData,setLoading }) => {
   
   
   
    return (
        <>
            {/* <input type="file" name="" id="" /> */}
            <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
                <form onSubmit={handleReviewSubmit}>
                    <div className='grid grid-cols-1 gap-10'>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-black'>
                                Title
                            </label>
                            <input
                                className='w-[400px] px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                value={propertyData?.title}
                                onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                                placeholder='Title'
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
                       
                        <div >
                            <label htmlFor='Date' className='block text-gray-600'>
                                  Review Time
                                </label>
                                    <DatePicker className="h-12 w-full border-blue-300 focus:outline-blue-500 rounded-md" onChange={onChange} value={value} />
                                </div>
                       

                    </div>
                    
                    <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-black'>
                                Description
                            </label>
                            <textarea
                                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                name='description'
                                id='description'
                                type='text'
                                
                                placeholder='description'
                                required
                            />
                        </div>

                    <button
                        type='submit'
                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-800'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default ReviewModalForm
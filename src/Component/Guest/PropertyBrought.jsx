import React, { useState } from 'react';
import { axiosSecure } from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Button } from '@headlessui/react';
import BookingModal from './BookingModal';
import useAuth from '../hooks/useAuth';

const PropertyBrought = () => {
  const {user} = useAuth()
  const [propertys, setPropertys] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { data: propertyes = [], isLoading, refetch } = useQuery({
    queryKey: ['offer'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offer`)
      return data
    }
  })
  console.log(propertyes)
  const filteredProperties = propertyes.filter(property => property?.guest?.email === user?.email);
  console.log(propertyes)
  const closeModal = () =>{
    setIsOpen(false)
  }
  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <Helmet>
        <title>Manage Property</title>
      </Helmet>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Location
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Title
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Image
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Agent Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Offered Amount
                  </th>

                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-[#F7EFE5]  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Transiction Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredProperties.map(property => <tr key={property._id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.location}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property.title}</p>
                    </td>


                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <img src={property?.image} alt="" />
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.agent}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.offerprice}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.status}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.status === 'Accepted' ? 
                        <button  onClick={()=>setPropertys(property)} className='btn bg-blue-900 text-white'>Pay</button> : property?.transactionId}</p>
                    </td>
                  </tr>)
                }

                {/* payment modal */}
              {
                propertys &&   <BookingModal
                isOpen={true}
                refetch={refetch}
                setPropertys={setPropertys}
                bookingInfo={propertys}
                closeModal={closeModal}
              ></BookingModal>
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBrought;
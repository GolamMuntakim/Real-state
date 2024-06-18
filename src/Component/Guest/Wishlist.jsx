import React, { useState } from 'react';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import OfferModal from './OfferModal';

const Wishlist = () => {
    const {user} = useAuth()
    const [isEditModal, setIsEditModal] = useState(false)
    const [propertys, setPropertys] = useState(null)
    const axiosSecure = useAxiosSecure()
    // fetch users data
  
    const {data: propertyes=[], isLoading, refetch} = useQuery({
        queryKey : ['manage-property'],
        queryFn : async()=>{
          const {data} = await axiosSecure.get(`/manage-property`)
          return data.filter(state => state.add === 'wishlists')
        }
      })
    

      //delete 
      const {mutateAsync} = useMutation({
        mutationFn : async id =>{
            const {data} = await axiosSecure.patch(`/wishlist/remove/${id}`)
            return data
        },
        onSuccess:data =>{
            console.log(data)
            refetch()
            toast.success('Remove the Property')
        }
      })

      //handle delete
      const handleRemove = async id =>{
        console.log(id)
        try{
            await mutateAsync(id)
        }catch(err){
            console.log(err)
        }
      }
      if(isLoading) return <LoadingSpinner></LoadingSpinner>
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
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Agent Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Agent Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Offer
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                    Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    propertyes.map(property=>  <tr key={property._id}>
                       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <img src={property?.image} alt=""  />
                     </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property.title}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.location}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.agent.name}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <img src={property?.agent.image} alt=""  />
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.status}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.price}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button 
                      onClick={()=> setPropertys(property)}
                      className="btn bg-green-900 text-white ">
                    Make An Offer
                        </button>
                        {/* modal */}
                        
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button onClick={()=>handleRemove(property._id)} className="btn bg-red-900 text-white ">Remove</button>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     </td>
                   </tr>)
                     
                }
                     {
                      propertys &&   <OfferModal
                      isOpen={true} 
                      //  setIsEditModalOpen={setIsEditModal}
                       propertys={propertys}
                        refetch={refetch}
                        setPropertys={setPropertys}
                       ></OfferModal>
                     }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Wishlist;
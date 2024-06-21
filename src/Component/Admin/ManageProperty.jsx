

import { Helmet } from 'react-helmet-async'
// import useAuth from '../../../../hooks/useAuth'

import { useMutation, useQuery } from '@tanstack/react-query'

// import Swal from "sweetalert2";
import useAxiosSecure from '../hooks/useAxiosSecure'
import LoadingSpinner from '../LoadingSpinner'
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const ManageProperty = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    // fetch users data
  
    const {data: propertyes=[], isLoading, refetch} = useQuery({
        queryKey : ['manage-property'],
        queryFn : async()=>{
          const {data} = await axiosSecure.get(`/manage-property`)
          return data
        }
      })
      console.log(propertyes)

      //delete 
      const {mutateAsync} = useMutation({
        mutationFn : async id =>{
            const {data} = await axiosSecure.delete(`/manage-propertys/${id}`)
            return data
        },
        onSuccess:data =>{
            console.log(data)
            refetch()
            toast.success('Rejected the Property')
        }
      })
      // make property verified
      const handleVerified = property => {
        axiosSecure.patch(`/propertys/status/${property._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${property.title} is verified now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

      //handle delete
      const handleDelete = async id =>{
        console.log(id)
        try{
            await mutateAsync(id)
        }catch(err){
            console.log(err)
        }
      }
      if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
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
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Agent Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Agent Email
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                     Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                    Verify
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                    Reject
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    propertyes.map(property=>  <tr key={property._id}>
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
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.agent.email}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.price}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button 
                     onClick={()=>handleVerified(property)}
                     
                      className="btn bg-green-900 text-white ">
                    {property.status === "pending" ? 'verify' : 'verified'}
                        </button>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button onClick={()=>handleDelete(property._id)} className="btn bg-red-900 text-white ">Reject</button>
                      
                     </td>
               
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     </td>
                   </tr>)
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageProperty
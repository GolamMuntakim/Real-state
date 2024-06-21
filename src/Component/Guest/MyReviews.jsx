import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";


const MyReviews = () => {
  const {user} = useAuth()
    const {data: reviews=[], isLoading, refetch} = useQuery({
        queryKey : ['reviews'],
        queryFn : async()=>{
          const {data} = await axiosSecure.get(`/reviews`)
          return data
        }
      })
      console.log(reviews)

      const filteredProperties = reviews.filter(property => property.reviewerEmail === user.email);
       //delete 
       const {mutateAsync} = useMutation({
        mutationFn : async id =>{
            const {data} = await axiosSecure.delete(`/reviews/delete/${id}`)
            return data
        },
        onSuccess:data =>{
            console.log(data)
            refetch()
            toast.success('Review deleted succesfully')
        }
      })

      //handle delete
      const handledelete = async id =>{
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
                      Title
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
                      Review Time
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Description
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    filteredProperties.map(property=>  <tr key={property._id}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property.title}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.agent}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{new Date(property.date).toLocaleDateString()}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{property?.description}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button 
                     onClick={()=>handledelete(property._id)} 
                     className="btn bg-red-900 text-white ">Delete</button>
                     </td>
                   </tr>)
                     
                }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MyReviews;
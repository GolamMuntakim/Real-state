import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";


const ManageReviews = () => {
    const { data: propertyes = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-reviews'],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/manage-reviews`)
          return data
        }
      })

       //delete 
       const {mutateAsync} = useMutation({
        mutationFn : async id =>{
            const {data} = await axiosSecure.delete(`/deletereviews/${id}`)
            return data
        },
        onSuccess:data =>{
            console.log(data)
            refetch()
            toast.success('Review deleted succesfully')
        }
      })

      //handle delete
      const handleReviewdelete = async id =>{
        console.log(id)
        try{
            await mutateAsync(id)
        }catch(err){
            console.log(err)
        }
      }
      if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
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
                    Reviewer Image
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Reviews Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Reviewr Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                   Review
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
                  propertyes.map(property => <tr key={property._id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     
                      <img src={property?.reviewrImage} alt=""  />
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property.reviewerEmail}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.reviewerName}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.description}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        <button   onClick={()=>handleReviewdelete(property._id)}  className='btn bg-blue-900 text-white'>Delete</button> 
                        </p>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default ManageReviews;
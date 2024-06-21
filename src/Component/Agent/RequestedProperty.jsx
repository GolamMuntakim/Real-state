import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";
import { axiosSecure } from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const RequestedProperty = () => {
    const {data: offers=[], isLoading, refetch} = useQuery({
        queryKey : ['offers'],
        queryFn : async()=>{
          const {data} = await axiosSecure.get(`/offers`)
          return data
        }
      })
     
      //update property status
      const handleAccept = offer => {
        axiosSecure.patch(`/offer/status/${offer._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${offer.title} is Accepted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
      const handleOfferReject = offers => {
        axiosSecure.patch(`/offers/delete/${offers._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${offers.title} is Rejected`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

      //handle delete
      // const handleOfferdelete = async id =>{
      //   console.log(id)
      //   try{
      //       await mutateAsync(id)
      //   }catch(err){
      //       console.log(err)
      //   }
      // }
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
                      className='px-5 py-3 bg-green-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                    Buyer Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                     Buyer Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                     Offered price
                    </th>
                   
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                     Accept
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 text-white border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                     Reject
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                {
                    offers.map(offer=>  <tr key={offer._id}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{offer.title}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{offer?.location}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{offer?.guest.email}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{offer?.guest.name}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{offer?.price}</p>
                     </td>
                     {offer.status !== 'Accepted' && offer.status !== 'Rejected' && offer.status !== 'Bought' &&(
                      <>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button 
                     onClick={()=>handleAccept(offer)} 
                     className="btn bg-green-900 text-white "
                     >Accept</button>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button 
                     onClick={()=>handleOfferReject(offer)} 
                     className="btn bg-red-900 text-white ">Reject</button>
                     </td>
                      </>
                     )}
                     <td>
                      <p>{offer.status === "Accepted" || offer.status === "Rejected" || offer.status === "Bought" ? offer.status : ""}</p>
                     </td>
                   </tr>
                   )
                     
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

export default RequestedProperty;
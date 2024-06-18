import { Helmet } from "react-helmet-async";
import { axiosSecure } from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const Advertise = () => {
  
    const { data: propertyes = [], isLoading, refetch } = useQuery({
      queryKey: ['advertise'],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/advertise`)
        return data.filter(property=> property.status === 'verified')
      }
    })
    
    console.log(propertyes)
    const handleAdvertise = property => {
        axiosSecure.patch(`/advertisement/${property._id}`)
          .then(res => {
            console.log(res.data)
            if (res.data.modifiedCount > 0) {
              refetch()
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${property.title} add to the advertisement section succesfully`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
      }
   
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
                    Price
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
                   Advertise
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  propertyes.map(property => <tr key={property._id}>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <img src={property?.image} alt="" />
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property.title}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.price}</p>
                    </td>
                    


                   
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.agent.name}</p>
                    </td>
                    
                   
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     
                        <button  
                       onClick={() => handleAdvertise(property)}
                         className='btn bg-blue-900 text-white'>Advertise</button> 
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

export default Advertise;
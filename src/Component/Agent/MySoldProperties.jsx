import { Helmet } from "react-helmet-async";
import { axiosSecure } from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MySoldProperties = () => {
    const { data: propertyes = [], isLoading, refetch } = useQuery({
        queryKey: ['sold'],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/sold`)
          return data
        }
      })
      console.log(propertyes)
      const agentName = propertyes.length>0 ? propertyes[0]?.agent : 'unknown'
      const totalSold = propertyes.reduce((total, property)=>{
        return total + Number(property?.offerprice || 0)
      },0)
    return (
        <div>
            <div className='container mx-auto px-4 sm:px-8'>
      <Helmet>
        <title>Manage Property</title>
      </Helmet>
      <div className='py-8'>
      <p className="font-bold">Total sold amount of <span className="text-blue-500">{agentName}</span> is <span className="text-red-800">${totalSold.toFixed(2)}</span></p>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-black text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                  >
                    Title
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-black text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                  >
                    Location
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-black text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                  >
                    Buyer Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-black text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                  >
                   Buyer Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-black text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                  >
                   Sold Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  propertyes.map(property => <tr key={property._id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.title}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property.location}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>  {property?.guest.email}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.guest.name}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{property?.offerprice}</p>
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

export default MySoldProperties;
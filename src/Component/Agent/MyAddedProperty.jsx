
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosSecure from '../hooks/useAxiosSecure'
import LoadingSpinner from '../LoadingSpinner'
import useAuth from '../hooks/useAuth'
import PropertyRow from './PropertyRow'

const MyAddedProperty = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    // fetch room data
    const {data: propertyes=[], isLoading, refetch} = useQuery({
        queryKey : ['my-added', user?.email],
        queryFn : async()=>{
          const {data} = await axiosSecure.get(`/my-added/${user?.email}`)
          return data
        }
      })
      console.log(propertyes)
      const filteredProperties = propertyes.filter(property => property.email === user.email);

      //delete 
      const {mutateAsync} = useMutation({
        mutationFn : async id =>{
            const {data} = await axiosSecure.delete(`/property/${id}`)
            return data
        },
        onSuccess:data =>{
            console.log(data)
            refetch()
            toast.success('successfully deleted')
        }
      })

      //handle delete
      const handleDelete = async id =>{
        console.log(id)
        try{
            await mutateAsync(id)
        }catch(err){
            console.log(err)
        }
      }
      if (isLoading) return <LoadingSpinner />
  
  return (
    <>
      <Helmet>
        <title>My Added property</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead className=''>
                  <tr className=''>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                       Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                       image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {/* Room row data */}
                    {
                        filteredProperties.map(property=>
                            
                            <PropertyRow key={property._id} property={property} refetch={refetch} handleDelete={handleDelete}/>
                         )
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

export default MyAddedProperty
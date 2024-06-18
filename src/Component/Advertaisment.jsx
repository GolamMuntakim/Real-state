
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "./hooks/useAxiosCommon";
import LoadingSpinner from "./LoadingSpinner";
import PropertyCard from "./PropertyCard";
const Advertaisment = () => {
    const {data: propertys = [], isLoading} = useQuery({
        queryKey : ['propertys'],
        queryFn : async()=>{
          const {data} = await axiosCommon.get(`/propertys`)
          return data.filter(property=> property.newAdd === 'advertise')
        }
      })
      if (isLoading) return <LoadingSpinner />
    return (
        <div>
           {/* <Container> */}
        <div className='pt-12 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-8 '>
          {propertys.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
       {/* </Container> */}
        </div>
    );
};

export default Advertaisment;
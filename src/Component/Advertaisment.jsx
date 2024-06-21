
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "./hooks/useAxiosCommon";
import LoadingSpinner from "./LoadingSpinner";
import PropertyCard from "./PropertyCard";
import { Parallax } from 'react-parallax';
import img from '/images/adv.png'

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
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
         <h1 className="text-center font-bold mt-10 text-4xl mb-10">Advertise</h1>
         <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
    >
          <div className=' min-h-screen p-8'>
        <div className='pt-12 grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3  gap-8 '>
          {propertys.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      
        </div>
        </Parallax>
        </div>
    );
};

export default Advertaisment;
import { useParams } from "react-router-dom";
import Container from "./Container";
import LoadingSpinner from "./LoadingSpinner";
import useAxiosCommon from "./hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { axiosSecure } from "./hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import ReviewModal from "./Guest/ReviewModal";
import useAuth from "./hooks/useAuth";


const PropertyDetails = () => {
 const {user} = useAuth()
  const { id } = useParams()
  const axiosCommon = useAxiosCommon()
  const { data: property = {}, isLoading, refetch } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/property/${id}`)
      return data
    }
  })
  console.log(property)
  // add wishlist
  const handleWishlist = id => {
    const email =  {email: user.email}
    axiosSecure.patch(`/wislist/status/${id}`,email)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${property.title} add to the wishlist`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
 
  const [isEditModal, setIsEditModal] = useState(false)



  if (isLoading) return <LoadingSpinner />
  return (
    <div className="">

      <Helmet>
        <title>
          Property Details
        </title>
      </Helmet>
      <Container>
        {/* <Helmet>
        <title>{room?.title}</title>
      </Helmet> */}
        {property && (
          <div className='max-w-screen-lg mx-auto mt-10'>
            {/* Header */}
            <div className='flex flex-col gap-6'>
              <div>
                {/* <Heading title={room.title} subtitle={room.location} /> */}
                <div className='w-full md:h-[60vh] overflow-hidden rounded-xl '>
                  <img
                    className='object-cover w-full'
                    src={property.image}
                    alt='header image'
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
              {/* Room Info */}
              <div className='col-span-4 flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                  <div
                    className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                  >
                    <div>Posted by {property?.agent?.name}</div>

                    <img
                      className='rounded-full'
                      height='30'
                      width='30'
                      alt='Avatar'
                      src={property?.agent?.image}
                    />
                  </div>
                </div>

                <hr />
                <div
                  className='
          text-lg font-light text-black'
                >
                  Title : {property?.title}
                </div>
                <div
                  className='
          text-lg font-light text-black'
                >
                  Location : {property?.location}
                </div>
                <div
                  className='
          text-lg font-light text-black'
                >
                  Price : {property?.price}
                </div>
                <hr />
                <div className="flex">
                  <div> <button onClick={() => handleWishlist(property._id)} className="btn bg-green-900 text-white">Add To Wishlist</button></div>

                  <div><button onClick={() => setIsEditModal(true)} className="btn bg-blue-900 text-white">Add Review</button>
                    {/* modal */}
                    <ReviewModal isOpen={isEditModal}
                      setIsEditModalOpen={setIsEditModal}
                      property={property}
                      refetch={refetch}
                    ></ReviewModal>
                  </div>

                </div>
              </div>

             
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PropertyDetails;
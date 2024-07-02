import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { axiosSecure } from './hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import { Rating } from '@smastrom/react-rating';
// import '@smastrom/react-rating/style.css'

const Review = () => {
    const { data: propertyes = [], isLoading, refetch } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews`)
            return data
        }
    })
    console.log(propertyes)
    return (
        <div>

            <div className='w-[300px] lg:w-1/4 mx-auto text-center mt-10 mb-10' >
                {/* <h1 className='text-yellow-500 pb-4'>---What Our Client Say---</h1> */}
                <h1 className='uppercase  text-black font-bold lg:text-3xl'>Latest  Reviews</h1>
            </div>
            {/* Reviews : {reviews.length} */}
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    propertyes.map(review => <SwiperSlide key={review._id}>
                        <div className=' flex flex-col items-center lg:mx-24 lg:my-16'>

                            <div className=" flex flex-col w-[200px]  lg:w-[800px] lg:p-6 mx-auto divide-y rounded-md divide-gray-700 bg-white text-black">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <img className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" src={review.reviewrImage} alt="" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold">{review.reviewerName}</h2>
                                            <span className="text-xs text-black"> {new Date(review.date).toLocaleDateString()}</span>

                                        </div>
                                    </div>

                                </div>
                                <div className="p-4 space-y-2 text-sm text-black">
                                    <p className='py-8'>Description : {review.description}</p>
                                    <p className='py-8'>Title: {review.title}</p>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Review;
import { Cursor, useTypewriter } from 'react-simple-typewriter';

const Banner = () => {
  const [text]= useTypewriter({
    words:['Properties', 'House', 'Land'],
    loop:{},
    typeSpeed:100,
    deleteSpeed:50,
});
    return (
        <div>
             <div className="-mt-8 h-[685px]    text-center bg-[url('/images/banner.jpg')] w-full bg-cover bg-center bg-no-repeat ">
        <h1 className=" font-bold text-3xl text-white mt-8 pt-8">Your Dream Home Awaits <br></br> Discover Exceptional  <span> {text}</span>
        <span className='text-black'><Cursor/></span>  </h1>
        <small className="text-center font-bold text-white">Expertly Curated Listings, Unmatched Service, and Your Path to Homeownership Excellence!</small>
        <img src="/images/bannerpic.png" alt=""  />
      </div>
           
        </div>
    );
};

export default Banner;
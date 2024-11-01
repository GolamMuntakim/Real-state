import { Helmet } from "react-helmet-async";
import Advertaisment from "./Advertaisment";
import Banner from "./Banner";
import Container from "./Container";
import Review from "./Review";
import Testimonial from "./Testimonial";


const Home = () => {
    return (
        <div className="w-full md:w-[600px] lg:w-full p-0 m-0">
          <Helmet>
            <title>
              Home
            </title>
          </Helmet>
         <div> <Banner ></Banner></div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="mb-10">
           
          <Advertaisment ></Advertaisment>
          
          </div>
          <div>
            <Testimonial></Testimonial>
          </div>
          <div>
            <Review></Review>
          </div>
        </div>
    );
};

export default Home;
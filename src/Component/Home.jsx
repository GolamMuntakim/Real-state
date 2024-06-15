import { Helmet } from "react-helmet-async";
import Advertaisment from "./Advertaisment";


const Home = () => {
    return (
        <div >
          <Helmet>
            <title>
              Home
            </title>
          </Helmet>
          <br />
          <br />
          <br />
         
          <div> <Advertaisment></Advertaisment></div>
        </div>
    );
};

export default Home;
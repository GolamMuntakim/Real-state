import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";


const Main = () => {
    return (
        <div className="container w-full lg:max-w-screen-xl mx-auto overflow-x-hidden ">
           <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
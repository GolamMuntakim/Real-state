import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../Component/ErrorPage";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Signup from "../Component/Signup";
import PropertyDetails from "../Component/PropertyDetails";
import Dashboard from "../Component/Dashboard";
import Common from "../Component/Common/Common";
import AddProperty from "../Component/Agent/AddProperty";
import MyAddedProperty from "../Component/Agent/MyAddedProperty";
import RequestedProperty from "../Component/Agent/RequestedProperty";
import ManageUser from "../Component/Admin/ManageUser";
import Profile from "../Component/DashboardItem/Profile";
import ManageProperty from "../Component/Admin/ManageProperty";
import Wishlist from "../Component/Guest/Wishlist";
import PropertyBrought from "../Component/Guest/PropertyBrought";
import MyReviews from "../Component/Guest/MyReviews";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement : <ErrorPage></ErrorPage>,
      children : [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path:'propertyDetails/:id',
          element:<PropertyDetails></PropertyDetails>
        }
      ]
    },
    {path:'/login', element:<Login></Login>},
    {path:'/signup', element:<Signup></Signup>},
    {
      path:'/dashboard',
     element:<Dashboard></Dashboard>,
     children:[
      {
        index: true,
        element: <Common></Common>
      },
      {
        path:'profile',
        element: <Profile></Profile>
      },
      {
        path:'add-property',
        element: <AddProperty></AddProperty>
      },
      {
        path:'my-added',
        element: <MyAddedProperty />
      },
      {
        path:'requested',
        element: <RequestedProperty></RequestedProperty>
      },
      {
        path:'manage-users',
        element: <ManageUser></ManageUser>
      },
      {
        path:'manage-property',
        element: <ManageProperty></ManageProperty>
      },
      {
        path:'my-wishlist',
        element: <Wishlist></Wishlist>
      },
      {
        path:'property-brought',
        element: <PropertyBrought></PropertyBrought>
      },
      {
        path:'reviews',
        element: <MyReviews></MyReviews>
      },
      
     ]
    }
  ]);


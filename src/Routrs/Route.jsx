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
import MySoldProperties from "../Component/Agent/MySoldProperties";
import ManageReviews from "../Component/Admin/ManageReviews";
import AllProperties from "../Component/AllProperties";
import Advertaisment from "../Component/Advertaisment";
import Advertise from "../Component/Admin/Advertise";
import Statistics from "../Component/Common/Statistics";
import PrivateRoute from "../Component/PrivateRoute";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";

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
          element:<PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>
        },
        {
          path:'all-properties',
          element:<AllProperties></AllProperties>
        }
      ]
    },
    {path:'/login', element:<Login></Login>},
    {path:'/signup', element:<Signup></Signup>},
    {
      path:'/dashboard',
     element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
     children:[
      {
        index: true,
        element: <PrivateRoute><Statistics></Statistics></PrivateRoute>
      },
      {
        path:'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:'add-property',
        element: <PrivateRoute><AgentRoute><AddProperty></AddProperty></AgentRoute></PrivateRoute>
      },
      {
        path:'my-added',
        element: <PrivateRoute><AgentRoute><MyAddedProperty /></AgentRoute></PrivateRoute>
      },
      {
        path:'requested',
        element: <PrivateRoute><AgentRoute><RequestedProperty></RequestedProperty></AgentRoute></PrivateRoute>
      },
      {
        path:'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUser></ManageUser></AdminRoute></PrivateRoute>
      },
      {
        path:'manage-property',
        element: <PrivateRoute><AdminRoute><ManageProperty></ManageProperty></AdminRoute></PrivateRoute>
      },
      {
        path:'my-wishlist',
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
      },
      {
        path:'property-brought',
        element: <PrivateRoute><PropertyBrought></PropertyBrought></PrivateRoute>
      },
      {
        path:'reviews',
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path:'sold',
        element:<PrivateRoute><AgentRoute> <MySoldProperties></MySoldProperties></AgentRoute></PrivateRoute>
      },
      {
        path:'manage-reviews',
        element: <PrivateRoute><AdminRoute><ManageReviews></ManageReviews></AdminRoute></PrivateRoute>
      },
      {
        path:'advertise',
        element:<PrivateRoute><AdminRoute> <Advertise></Advertise></AdminRoute></PrivateRoute>
      },
      
     ]
    }
  ]);


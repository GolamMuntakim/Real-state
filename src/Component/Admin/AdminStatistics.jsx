import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner";
import Lottie from "lottie-react";
import user from '../../user.json'
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Customized,
  Cross,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Helmet } from "react-helmet-async";
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};


const AdminStatistics = () => {
   
    const axiosSecure = useAxiosSecure()
    const {data: statData={}, isLoading} = useQuery({
        queryKey:['admin-stat'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/admin-stat')
            return data
        }
    })
    console.log(statData)

    
      
      
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
           <Helmet>
            <title>
              Admin Statics
            </title>
          </Helmet>
           <h1 className="text-center font-bold text-3xl">Welcome to Admin Dashboard</h1>
           <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto gap-4 mt-8">
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total User <span >: {statData?.totalusers}</span></h1>
            </div>
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total Property : {statData?.totalProperty}</h1>
            </div>
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total Sold Property : {statData?.bookingDetails.length}</h1>
            </div>
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total Reviews : {statData?.totalReview}</h1>
            </div>
           </div>
           <div className="mt-8">
          <ResponsiveContainer width="100%" height={300}>
          <BarChart
      width={500}
      height={300}
      data={statData.bookingDetails}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="title" />
      <YAxis />
      <Bar dataKey="price" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }} >
        {statData.bookingDetails.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
      <Legend></Legend>
    </BarChart>
          </ResponsiveContainer>
           </div>
        </div>
    );
};

export default AdminStatistics;
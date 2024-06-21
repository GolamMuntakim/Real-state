import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis } from "recharts";
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
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
const GuestStatistics = () => {
    const axiosSecure = useAxiosSecure()
    const {data: chartData={}, isLoading} = useQuery({
        queryKey:['guest-stat'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/guest-stat')
            return data
        }
    })
    console.log(chartData)
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="font-bold text-3xl text-center">
        Welcome to Guest Dashboard
        <div>
        <div>
      
       <div className="flex gap-4 mt-8">
        <div className="p-4 bg-blue-900 text-white rounded-md">
            <h1 className="flex items-center text-xl">Total Bought Property <span >: {chartData?.totalSoldProperty}</span></h1>
        </div>
        <div className="p-4 bg-blue-900 text-white rounded-md">
            <h1 className="flex items-center text-xl">Total Review : {chartData?.totalReview}</h1>
        </div>
      
       </div>
       <div className="mt-8">
      
     <BarChart
  width={500}
  height={300}
  data={chartData.bookingDetails}
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
    {chartData.bookingDetails.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
    ))}
  </Bar>
  <Legend></Legend>
</BarChart>
       </div>
    </div>
        </div>
    </div>
    );
};

export default GuestStatistics;
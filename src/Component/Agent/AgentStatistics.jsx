import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
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
  PieChart,
  Pie,
} from "recharts";
import LoadingSpinner from "../LoadingSpinner";
import { Helmet } from "react-helmet-async";

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

const AgentStatistics = () => {
    const axiosSecure = useAxiosSecure()
    const {data: chartData={}, isLoading} = useQuery({
        queryKey:['agent-stat'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/agent-stat')
            return data
        }
    })
    console.log(chartData)
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    
    return (
        <>
         <Helmet>
            <title>
              Agent Statics
            </title>
          </Helmet>
        <div className="text-center font-bold text-3xl">
            Welcome to Agent Dashboard
            <div>
            <div>
          
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total Added Property <span >: {chartData?.totalProperty}</span></h1>
            </div>
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total Requested Property : {chartData?.totalRequestedProperty.length}</h1>
            </div>
            <div className="p-4 bg-blue-900 text-white rounded-md">
                <h1 className="flex items-center text-xl">Total Sold Property : {chartData?.totalSoldProperty}</h1>
            </div>
           </div>
           <div className="mt-8">
          
        <ResponsiveContainer width="100%" height={300}>
        <BarChart
       width={500}
       height={300}
      data={chartData.totalRequestedProperty}
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
        {chartData.totalRequestedProperty.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
      <Legend></Legend>
    </BarChart>
        </ResponsiveContainer>
           </div>
        </div>
            </div>
        </div>
        </>
    );
};

export default AgentStatistics;
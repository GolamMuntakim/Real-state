import AdminStatistics from "../Admin/AdminStatistics";
import AgentStatistics from "../Agent/AgentStatistics";
import GuestStatistics from "../Guest/GuestStatistics";
import LoadingSpinner from "../LoadingSpinner";
import useRole from "../hooks/useRole";


const Statistics = () => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <>
             {role === 'guest' && <GuestStatistics></GuestStatistics>}
             {role === 'agent' && <AgentStatistics></AgentStatistics>}
            {role === 'admin' && <AdminStatistics></AdminStatistics>}
            
           
        </>
    );
};

export default Statistics;
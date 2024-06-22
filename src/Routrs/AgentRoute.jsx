import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Component/LoadingSpinner";
import useRole from "../Component/hooks/useRole";


const AgentRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (role === 'agent') return children
    return <Navigate to='/dashboard' />
};

export default AgentRoute;
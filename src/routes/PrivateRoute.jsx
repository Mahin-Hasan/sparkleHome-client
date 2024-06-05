import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <>
            <div className="flex justify-center items-center h-screen w-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        </>
    }

    if (!isLoading && !user?.email) {
        return <Navigate to='/login' />

    }

    return children




    //another style
    // const { user, isLoading } = useAuth()
    // // const location = useLocation()

    // if (isLoading) return <span className="loading loading-bars loading-lg"></span>
    // if (user) return children
    // return <Navigate to='/login' />
};

export default PrivateRoute;
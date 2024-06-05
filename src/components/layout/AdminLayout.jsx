import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-[1] bg-green-500">
                <h1>sidebar</h1>
            </div>
            <div className="flex-[3] bg-red-500">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
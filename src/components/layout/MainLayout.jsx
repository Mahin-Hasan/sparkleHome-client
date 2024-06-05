import { Link, NavLink } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import Sidebar from "./Sidebar";
import Container from "../ui/Container";

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-indigo-500">
                    <Container>
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 text-2xl font-semibold text-white"><Link to='/'>Sparkle Home</Link></div>
                        <div className="flex-none hidden lg:block">
                            <NavbarMenu />
                        </div>
                    </Container>
                </div>
                {/* Page content here */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full glass">
                    {/* Sidebar content here */}
                    <Sidebar />
                </ul>
            </div>
        </div>
    );
};

export default MainLayout;
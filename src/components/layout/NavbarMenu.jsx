import { NavLink } from 'react-router-dom';

const NavbarMenu = () => {
    return (
        <div className="flex gap-2">
            {/* Navbar menu content here */}
            <NavLink to='/about' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>About</NavLink>
            <NavLink to='/contact' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>Contact</NavLink>
            <NavLink to='/login' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>Login</NavLink>
        </div>
    );
};

export default NavbarMenu;
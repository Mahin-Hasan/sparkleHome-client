import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const NavbarMenu = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex gap-2">
            {/* Navbar menu content here */}
            <NavLink to='/about' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>About</NavLink>
            <NavLink to='/contact' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>Contact</NavLink>
            <NavLink to='/services' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>Services</NavLink>
            {
                user?.email
                    ?
                    (
                        <button onClick={logout} className='btn bg-red-700 text-white border-none font-semibold btn-sm'>Logout</button>
                    )
                    :
                    (
                        <NavLink to='/login' className={({ isActive }) => isActive ? "btn btn-info text-white font-semibold btn-sm" : "btn btn-ghost text-white font-semibold btn-sm"}>Login</NavLink>
                    )
            }
            
        </div>
    );
};

export default NavbarMenu;
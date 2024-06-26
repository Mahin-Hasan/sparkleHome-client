import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const axios = useAxios();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const toastId = toast.loading('logging in')

        try {
            const user = await login(email, password);
            const res = await axios.post('/auth/access-token', { email: user.user.email })

            if (res.data.success) { //logging out the user if token is not generated || see main course video where this issue is directly handled in the auth provider
                toast.success('User Logged in', { id: toastId })
                navigate('/')

            } else {
                logout()
            }

            console.log(user);
        } catch (err) {
            toast.error(err.message, { id: toastId })
        }

        console.log(email);
        console.log(password);
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-secondary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
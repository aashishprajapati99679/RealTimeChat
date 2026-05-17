import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';



const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        {
            userName: "",
            password: ""
        }
    );
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/user/login", user, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data);
            dispatch(setAuthUser(res.data)); //send the data to the store
            localStorage.setItem("authUser", JSON.stringify(res.data));
            toast.success("Login successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed due to a network error");
            console.log(error);
        }
        setUser({
            userName: "",
            password: "",
        })
    }
    return (
        <div className='text-black w-[30%]'>
            <div className='w-full p-6 rounded-lg shadow-md bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form action="" onSubmit={handleLogin}>

                    <div>
                        <label className='label p-2'>
                            <span className='text-black label-text'> User Name : </span>
                        </label>
                        <input type="text"
                            placeholder='Ashish'
                            className='w-full input bg-white text-black file-input-bordered h-10'
                            value={user.userName}
                            onChange={(e) => { setUser({ ...user, userName: e.target.value }) }} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-black label-text'> Password : </span>
                        </label>
                        <input type="password"
                            placeholder='Enter your password'
                            className='w-full input bg-white text-black file-input-bordered h-10'
                            value={user.password}
                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                    </div>


                    <Link to="/register">
                        <p className='text-black label-text mt-4'>Don't have an account? Register</p>
                    </Link>
                    <button
                        type='submit'
                        className='btn btn-block bg-white text-black btn-neutral mt-4'>Login</button>
                </form>

            </div>

        </div >
    )
}

export default Login
import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import OtherUsers from './OtherUsers';

const Sidebar = () => {

    const { otherUsers } = useSelector(store => store.user);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
    }

    const logoutHandler = async () => {
        try {
            axios.defaults.withCredentials = true;

            const res = await axios.get(
                "http://localhost:8080/api/v1/user/logout"
            );

            toast.success(res.data.message);
            localStorage.removeItem("authUser");
            navigate("/login");
            dispatch(setAuthUser(null));
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler}>
                <div className="relative w-full">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search here"
                        className="w-full bg-white text-black input input-bordered rounded-full pr-12"
                    />

                    <button
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                    >
                        <BiSearch size={20} />
                    </button>
                </div>
            </form>

            <div className='divider px-3'></div>

            <OtherUsers search={search} />

            <div className='mt-2'>
                <button
                    onClick={logoutHandler}
                    className='btn btn-sm bg-sky-600 text-white hover:bg-sky-500'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar
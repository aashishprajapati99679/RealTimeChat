import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import OtherUsers from './OtherUsers';

const Sidebar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
    }

    const editProfileHandler = () => {
        navigate("/edit");
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
                    onClick={editProfileHandler}
                    className='btn btn-sm bg-sky-600 text-white hover:bg-sky-500'
                >
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default Sidebar
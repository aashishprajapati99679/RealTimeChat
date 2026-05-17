import React from 'react'
import { setSelectedUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const OtherUser = (props) => {
    const user = props.user;
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isonline = onlineUsers?.includes(user._id);
    const setSelectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <>
            <div className='flex flex-col'>
                <div onClick={() => { setSelectedUserHandler(user) }} className={` ${selectedUser?._id === user._id ? 'bg-sky-600' : ""}  flex items-center gap-5 hover:bg-sky-500 rounded p-2 cursor-pointer border border-gray-100`}>
                    <div className={`avatar ${isonline ? "online" : ""}`}>
                        <div className='w-12 rounded-full'>
                            <img src={user.profilePhoto} alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col  flex-1 gap-1'>
                        <div className="flex justify-between gap-2">
                            <p>{user.fullName}</p>
                        </div>
                    </div>
                </div>
                <div className=' divider my-0 py-0'></div>
            </div>
        </>
    )
}

export default OtherUser
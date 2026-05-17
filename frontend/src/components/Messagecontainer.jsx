import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearUnreadCount } from '../redux/userSlice';

const Messagecontainer = () => {
    const { selectedUser, authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const markMessagesAsRead = async () => {
            if (selectedUser) {
                // Optimistically clear the unread count in the UI instantly
                dispatch(clearUnreadCount(selectedUser._id));
                try {
                    axios.defaults.withCredentials = true;
                    await axios.put(`http://localhost:8080/api/v1/message/mark-read/${selectedUser._id}`);
                } catch (error) {
                    console.log("Failed to mark messages as read:", error);
                }
            }
        };

        markMessagesAsRead();
    }, [selectedUser, dispatch]);
    return (
        <div className='flex-1 flex flex-col h-full'>
            {selectedUser !== null ? (
                <>
                    {/* Header */}
                    <div className="flex items-center gap-2 p-2 border-b border-gray-400">
                        <div className="avatar">
                            <div className='w-12 rounded-full'>
                                <img
                                    src={selectedUser?.profilePhoto}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium'>{selectedUser?.fullName}</p>
                            <p className='text-xs text-gray-700'>{selectedUser?.about}</p>
                        </div>
                    </div>

                    <Messages />
                    <SendInput />
                </>
            ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-black font-bold">Hi, {authUser?.fullName} </h1>
                    <h1 className="text-2xl text-black">Let's start conversation</h1>
                </div>
            )}
        </div>
    )
}

export default Messagecontainer
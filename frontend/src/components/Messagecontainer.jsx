import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux';
const Messagecontainer = () => {
    const { selectedUser, authUser } = useSelector(store => store.user);
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
                        <p className='font-medium'>{selectedUser?.fullName}</p>
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
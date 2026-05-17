import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser } = useSelector(store => store.user);
    const { selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [message])
    const isSender =
        authUser?._id?.toString() ===
        (message?.senderId?._id || message?.senderId)?.toString();
    return (
        <div ref={scroll} className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={message.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">
                    {message?.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                </time>
            </div>
            <div className={`chat-bubble ${message?.senderId === authUser?._id ? "bg-green-300 text-black" : "bg-white text-black"}`}>
                {message?.message}
            </div>
        </div >
    )
}

export default Message
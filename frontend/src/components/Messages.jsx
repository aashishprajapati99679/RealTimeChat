import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux';
import UseGetRealTimeMessage from '../hooks/UseGetRealTimeMessage';
import UseGetMessages from '../hooks/UseGetMessages';

const Messages = () => {
    UseGetRealTimeMessage();
    UseGetMessages();
    const { messages } = useSelector(store => store.message);
    return (
        <div
            className='flex-1 overflow-y-auto px-4 py-3 space-y-2 h-full'
        >
            {
                messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />

                    )
                })
            }
        </div>
    )
}

export default Messages
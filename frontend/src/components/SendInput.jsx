import React, { useState } from 'react'
import { SendHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setMessages } from '../redux/messageSlice'

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `/api/v1/message/send/${selectedUser?._id}`,
                { message },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            dispatch(setMessages([...messages, res?.data]));

            setMessage("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-[98%] mx-auto pb-4">
            <form
                onSubmit={onSubmitHandler}
                className="w-full flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md"
            >
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-black"
                />

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition"
                >
                    <SendHorizontal size={20} />
                </button>
            </form>
        </div>
    )
}

export default SendInput
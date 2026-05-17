import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { updateUserConversation } from "../redux/userSlice";

const UseGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message);
    const { selectedUser, authUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Check if the message belongs to the currently active chat
            const isForActiveChat = selectedUser?._id === newMessage.senderId || selectedUser?._id === newMessage.receiverId;
            
            if (isForActiveChat) {
                dispatch(setMessages([...messages, newMessage]));
            }

            // Figure out the other user's ID
            // If we sent the message, the other user is receiver. If we received it, the other user is sender.
            const otherUserId = newMessage.senderId === authUser?._id ? newMessage.receiverId : newMessage.senderId;

            // Increment unread count only if we are the receiver AND we do NOT have that chat currently open
            const shouldIncrementUnread = newMessage.receiverId === authUser?._id && selectedUser?._id !== newMessage.senderId;

            dispatch(updateUserConversation({
                userId: otherUserId,
                newMessage,
                incrementUnread: shouldIncrementUnread
            }));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, messages, selectedUser, authUser, dispatch]);
};
export default UseGetRealTimeMessage;
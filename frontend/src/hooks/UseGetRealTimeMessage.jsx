import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const UseGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, messages, dispatch]);
};
export default UseGetRealTimeMessage;
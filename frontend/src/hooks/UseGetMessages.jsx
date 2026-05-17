import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setMessages } from '../redux/messageSlice'
const UseGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);

    useEffect(() => {

        const fetchMessages = async () => {

            try {

                if (!selectedUser?._id) return;

                const res = await axios.get(
                    `/api/v1/message/${selectedUser._id}`
                );
                dispatch(setMessages(res.data.messages));

            } catch (error) {

                console.log(error);

            }
        };

        fetchMessages();

    }, [selectedUser, dispatch]);

};

export default UseGetMessages
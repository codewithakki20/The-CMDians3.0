import { setMessages } from "../redux/chatSlice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import server from "../api/axiosInstance";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.auth);

    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`${server}/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (selectedUser?._id) {
            fetchAllMessage();
        }
    }, [selectedUser, dispatch]);
};

export default useGetAllMessage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/chatSlice';
import { getSocket } from '../lib/socket';

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.chat);

  useEffect(() => {
    const socket = getSocket();

    socket?.on('newMessage', (newMessage) => {
      // Ensure messages is always an array
      const updatedMessages = Array.isArray(messages) ? [...messages, newMessage] : [newMessage];
      dispatch(setMessages(updatedMessages));
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [dispatch, messages]); // Add messages to dependencies to ensure it updates correctly
};

export default useGetRTM;

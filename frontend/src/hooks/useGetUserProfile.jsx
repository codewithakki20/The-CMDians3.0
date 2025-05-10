// useGetUserProfile.js
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserProfile } from '../redux/authSlice';
import { useEffect, useState } from 'react';
import server from '../api/axiosInstance';

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);      // Add error state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);  // Start loading
        const res = await axios.get(`${server}/api/v1/user/${userId}/profile`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        setError(error);  // Set error if something goes wrong
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchUserProfile();
  }, [userId, dispatch]);

  return { loading, error };
};

export default useGetUserProfile;

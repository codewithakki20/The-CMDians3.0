import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../redux/authSlice';
import axios from 'axios';
import server from '../api/axiosInstance';

const useFollowUnfollow = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth); // Current logged-in user info
  const { socket } = useSelector((store) => store.socketio); // Socket instance

  const handleFollowUnfollow = async (targetUserId, isFollowing) => {
    if (!user) return;

    try {
      // Send follow/unfollow request to the server
      const res = await axios.post(`${server}/api/v1/user/followorunfollow/${targetUserId}`, {}, { withCredentials: true });

      // Check if the server request was successful
      if (res.data.success) {
        if (isFollowing) {
          // Dispatch action to update Redux state for unfollow
          dispatch(unfollowUser(targetUserId));
        } else {
          // Dispatch action to update Redux state for follow
          dispatch(followUser(targetUserId));
        }

        // Emit socket notification
        socket?.emit('sendNotification', {
          senderId: user._id,
          receiverId: targetUserId,
          type: isFollowing ? 'unfollow' : 'follow',
          message: `${user.username} ${isFollowing ? 'unfollowed' : 'followed'} you.`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleFollowUnfollow };
};

export default useFollowUnfollow;

import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Tooltip
} from '@mui/material';
import { Bookmark, Message, MoreHoriz, Share } from '@mui/icons-material';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '../redux/postSlice';
import CommentDialog from '../components/CommentDialog';
import server from '../api/axiosInstance';
import { RingLoader } from 'react-spinners';

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { posts } = useSelector(state => state.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const likeOrDislikeHandler = async () => {
    setLoading(true); // Show loader while liking/disliking
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(`${server}/api/v1/post/${post._id}/${action}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPosts = posts.map(p =>
          p._id === post._id
            ? {
                ...p,
                likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
              }
            : p
        );
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const commentHandler = async () => {
    setLoading(true); // Show loader while commenting
    try {
      const res = await axios.post(
        `${server}/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedComments = [...comment, res.data.comment];
        setComment(updatedComments);
        const updatedPosts = posts.map(p =>
          p._id === post._id ? { ...p, comments: updatedComments } : p
        );
        dispatch(setPosts(updatedPosts));
        setText("");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const deletePostHandler = async () => {
    setLoading(true); // Show loader while deleting
    try {
      const res = await axios.delete(`${server}/api/v1/post/delete/${post._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPosts = posts.filter(p => p._id !== post._id);
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const bookmarkHandler = async () => {
    setLoading(true); // Show loader while bookmarking
    try {
      const res = await axios.get(`${server}/api/v1/post/${post._id}/bookmark`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const shareHandler = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.caption,
          text: `Check out this post by ${post.author?.username}`,
          url: `${window.location.origin}/post/${post._id}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      const postUrl = `${window.location.origin}/post/${post._id}`;
      navigator.clipboard.writeText(postUrl);
      toast.success('Post URL copied to clipboard');
    }
  };

  return (
    <div className="my-8 mx-auto w-full max-w-md bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Link to={`/profile/${post.author?._id}`} className="flex items-center gap-3 no-underline">
          <Avatar
            src={post.author?.profilePicture}
            sx={{ width: 44, height: 44, border: '2px solid #3b82f6' }}
          />
          <div className="flex items-center gap-2">
            <Typography
              variant="subtitle1"
              sx={{ color: '#ffffff', fontWeight: 600 }}
            >
              {post.author?.username}
            </Typography>
            {user?._id === post.author?._id && (
              <Badge
                color="primary"
                variant="dot"
                sx={{ '& .MuiBadge-dot': { backgroundColor: '#3b82f6' } }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: '#3b82f6', fontWeight: 500 }}
                >
                  Author
                </Typography>
              </Badge>
            )}
          </div>
        </Link>

        <IconButton
          onClick={handleMenuOpen}
          sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { backgroundColor: '#1f2937', color: '#ffffff', borderRadius: '0.75rem' },
          }}
        >
          {post?.author?._id !== user?._id && (
            <MenuItem
              onClick={handleMenuClose}
              sx={{ '&:hover': { backgroundColor: '#374151' } }}
            >
              Unfollow
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              bookmarkHandler();
              handleMenuClose();
            }}
            sx={{ '&:hover': { backgroundColor: '#374151' } }}
          >
            Add to favorites
          </MenuItem>
          {user?._id === post?.author?._id && (
            <MenuItem
              onClick={() => {
                deletePostHandler();
                handleMenuClose();
              }}
              sx={{ '&:hover': { backgroundColor: '#374151' } }}
            >
              Delete
            </MenuItem>
          )}
        </Menu>
      </div>

      {/* Image */}
      <img
        src={post.image}
        alt="Post"
        className="w-full object-cover aspect-square"
      />

      {/* Actions */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex gap-3">
          <IconButton
            onClick={likeOrDislikeHandler}
            sx={{ color: liked ? '#ef4444' : '#9ca3af' }}
          >
            {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}
          >
            <Message />
          </IconButton>
          <Tooltip title="Share Post" arrow>
            <IconButton
              onClick={shareHandler}
              sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}
            >
              <Share />
            </IconButton>
          </Tooltip>
        </div>
        <IconButton
          onClick={bookmarkHandler}
          sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}
        >
          <Bookmark />
        </IconButton>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <RingLoader color="#3b82f6" size={50} />
        </div>
      )}

      {/* Likes */}
      <Typography
        variant="body2"
        className="px-4 text-gray-200"
      >
        {postLike} likes
      </Typography>

      {/* Caption */}
      <Typography
        variant="body2"
        className="px-4 py-2 text-gray-100"
      >
        <strong>{post.author?.username}</strong> {post.caption}
      </Typography>

      {/* Comments */}
      {comment.length > 0 && (
        <Typography
          variant="body2"
          className="px-4 text-gray-400 cursor-pointer hover:text-gray-200"
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
        >
          View all {comment.length} comments
        </Typography>
      )}

      {/* Comment input */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-gray-700">
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value.trim() ? e.target.value : "")}
          placeholder="Add a comment..."
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.75rem',
              backgroundColor: '#374151',
              color: '#ffffff',
              '& fieldset': {
                borderColor: '#4b5563',
              },
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '0.75rem',
            textTransform: 'none',
            paddingX: 3,
            paddingY: 1.25,
            backgroundColor: '#3b82f6',
          }}
          onClick={commentHandler}
        >
          Post
        </Button>
      </div>

      {/* Comment Dialog */}
      {open && <CommentDialog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Post;

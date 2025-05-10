import React, { useEffect, useState } from 'react';
import {
  Dialog, Avatar, IconButton, TextField, Typography,
  Box, Button, DialogContent
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../pages/Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '../redux/postSlice';
import server from '../api/axiosInstance';

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState('');
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : '');
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `${server}/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedPost) return null;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '1rem', backgroundColor: '#1f2937' },
      }}
    >
      <DialogContent className="!p-0">
        <Box className="flex flex-col md:flex-row rounded-lg overflow-hidden">
          {/* Left - Post Image */}
          <Box className="md:w-1/2 w-full h-80 md:h-[600px] bg-black">
            <img
              src={selectedPost?.image}
              alt="post_img"
              className="w-full h-full object-cover"
            />
          </Box>

          {/* Right - Comments Section */}
          <Box className="md:w-1/2 w-full flex flex-col justify-between p-6 bg-gray-800">
            {/* Header */}
            <Box className="flex items-center justify-between mb-6">
              <Box className="flex items-center gap-4">
                <Avatar
                  src={selectedPost?.author?.profilePicture}
                  sx={{ width: 48, height: 48, border: '2px solid #3b82f6' }}
                />
                <Typography
                  variant="h6"
                  className="text-white font-semibold"
                >
                  {selectedPost?.author?.username}
                </Typography>
              </Box>
              <IconButton
                sx={{
                  color: '#9ca3af',
                  '&:hover': { color: '#3b82f6' },
                }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Box>

            {/* Comments */}
            <Box className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {comment.map((c) => (
                <Comment key={c._id} comment={c} />
              ))}
            </Box>

            {/* Input */}
            <Box className="pt-6 flex items-center gap-4 border-t border-gray-600 mt-6">
              <TextField
                fullWidth
                placeholder="Add a comment..."
                size="small"
                value={text}
                onChange={changeEventHandler}
                variant="outlined"
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
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
              <Button
                variant="contained"
                disabled={!text.trim()}
                onClick={sendMessageHandler}
                sx={{
                  borderRadius: '0.75rem',
                  backgroundColor: '#3b82f6',
                  '&:hover': { backgroundColor: '#2563eb' },
                  textTransform: 'none',
                  fontWeight: 600,
                  paddingX: 4,
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;

import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { readFileAsDataURL } from '../lib/utils';
import server from '../api/axiosInstance';
import { ClipLoader } from 'react-spinners';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState('');
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    if (imagePreview) formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${server}/api/v1/post/addpost`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
        setCaption('');
        setImagePreview('');
        setFile('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '1rem', backgroundColor: '#1f2937' },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '1.25rem',
        }}
      >
        Create New Post
      </DialogTitle>
      <DialogContent className="px-6 py-5">
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Avatar
            src={user?.profilePicture}
            sx={{ width: 48, height: 48, border: '2px solid #3b82f6' }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: '#ffffff' }}
            >
              {user?.username}
            </Typography>
            <Typography variant="caption" sx={{ color: '#9ca3af' }}>
              {user?.bio || 'Bio here...'}
            </Typography>
          </Box>
        </Box>

        <TextField
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          disabled={loading}
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

        {imagePreview && (
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={250}
            overflow="hidden"
            borderRadius={2}
            sx={{ border: '1px solid #4b5563' }}
          >
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-full object-cover rounded-md"
            />
          </Box>
        )}

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          hidden
          onChange={fileChangeHandler}
          disabled={loading}
        />

        <Box mt={3} textAlign="center">
          <Button
            variant="outlined"
            onClick={() => imageRef.current.click()}
            disabled={loading}
            sx={{
              borderRadius: '0.75rem',
              borderColor: '#3b82f6',
              color: '#3b82f6',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1,
              '&:hover': {
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                borderColor: '#3b82f6',
              },
            }}
          >
            Select from computer
          </Button>
        </Box>

        {imagePreview && !loading && (
          <Box mt={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={createPostHandler}
              sx={{
                borderRadius: '0.75rem',
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' },
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
              }}
            >
              Post
            </Button>
          </Box>
        )}

        {loading && (
          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={150}
          >
            <ClipLoader color="#3b82f6" size={60} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;

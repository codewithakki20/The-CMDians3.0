import React from 'react';
import { Avatar, Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';

const Comment = ({ comment, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full p-6">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  const { author, text } = comment || {};

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 w-full">
      <Avatar
        alt={author?.username || 'User'}
        src={author?.profilePicture || ''}
        sx={{
          width: { xs: 32, sm: 40 },
          height: { xs: 32, sm: 40 },
          border: '2px solid #3b82f6',
        }}
      />
      <div className="flex flex-col w-full">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: '#ffffff',
            fontSize: { xs: '0.875rem', sm: '0.9rem' },
            overflowWrap: 'break-word',
          }}
        >
          {author?.username || 'User'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#d1d5db',
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            lineHeight: 1.5,
            wordBreak: 'break-word',
          }}
        >
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default Comment;

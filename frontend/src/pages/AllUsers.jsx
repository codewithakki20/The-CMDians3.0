import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Link as MuiLink, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from '../components/SuggestedUsers';
import { ClipLoader } from 'react-spinners';

const AllUsers = () => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading delay (replace with actual loading logic if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        {/* User Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/profile/${user?._id}`}>
            <Avatar
              src={user?.profilePicture}
              alt={user?.username}
              sx={{
                width: 56,
                height: 56,
                border: '2px solid #3b82f6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
          </Link>

          <div>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: '#ffffff' }}
            >
              <MuiLink
                component={Link}
                to={`/profile/${user?._id}`}
                underline="hover"
                sx={{ color: '#ffffff', '&:hover': { color: '#3b82f6' } }}
              >
                {user?.username}
              </MuiLink>
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: '#9ca3af', fontSize: '0.875rem' }}
            >
              {user?.bio || 'No bio available.'}
            </Typography>
          </div>
        </div>

        {/* Suggested Users or Loading Spinner */}
        {loading ? (
          <Box className="flex justify-center items-center py-10">
            <ClipLoader size={45} color="#3b82f6" />
          </Box>
        ) : (
          <SuggestedUsers />
        )}
      </div>
    </div>
  );
};

export default AllUsers;

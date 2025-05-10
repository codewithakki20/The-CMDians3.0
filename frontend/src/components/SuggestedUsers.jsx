import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography } from '@mui/material';
import FollowButton from './FollowButton';

const SuggestedUsers = () => {
  
  const { suggestedUsers, user } = useSelector((store) => store.auth);

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <Typography
          variant="h6"
          sx={{ color: '#ffffff', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.125rem' } }}
        >
          Suggested for you
        </Typography>
        <Button
          sx={{
            color: '#3b82f6',
            fontWeight: 500,
            textTransform: 'none',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            '&:hover': { color: '#2563eb' },
          }}
        >
          See All
        </Button>
      </div>

      {/* Suggested users list */}
      <div className="space-y-4">
        {suggestedUsers?.map((userProfile) => {
          // Check if the logged-in user is following the current user profile
          const isFollowing = user?.following?.includes(userProfile._id);

          return (
            <div
              key={userProfile._id}
              className="flex items-center justify-between bg-gray-800 px-4 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* User avatar and info */}
              <div className="flex items-center gap-4">
                <Link to={`/profile/${userProfile._id}`}>
                  <Avatar
                    src={userProfile.profilePicture}
                    alt={userProfile.username}
                    sx={{ width: { xs: 44, sm: 52 }, height: { xs: 44, sm: 52 }, border: '2px solid #3b82f6' }}
                  />
                </Link>
                <div>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: '#ffffff', fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    <Link to={`/profile/${userProfile._id}`} className="hover:underline">
                      {userProfile.username}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#9ca3af', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {userProfile.bio || 'No bio available.'}
                  </Typography>
                </div>
              </div>

              {/* Follow/Unfollow Button */}
              <FollowButton targetUserId={userProfile._id} isFollowing={isFollowing} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedUsers;

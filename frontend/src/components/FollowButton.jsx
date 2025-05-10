import React from 'react';
import { Button } from '@mui/material';
import useFollowUnfollow from '../hooks/useFollowUnfollow';

const FollowButton = ({ targetUserId, isFollowing }) => {
  const { handleFollowUnfollow, loading } = useFollowUnfollow();

  const handleClick = () => {
    if (!loading) {
      handleFollowUnfollow(targetUserId, isFollowing);
    }
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleClick}
      disabled={loading}
      sx={{
        borderRadius: '9999px',
        textTransform: 'none',
        fontWeight: 600,
        backgroundColor: isFollowing ? '#e11d48' : '#3b82f6',
        '&:hover': {
          backgroundColor: isFollowing ? '#be123c' : '#2563eb',
        },
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        px: 3,
        py: 0.5,
      }}
    >
      {loading ? (isFollowing ? 'Unfollowing...' : 'Following...') : isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;

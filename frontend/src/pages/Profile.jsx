import React, { useState } from 'react';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Badge, Avatar, Typography } from '@mui/material';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import FollowButton from '../components/FollowButton';
import { ClipLoader } from 'react-spinners';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const { loading, error } = useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();

  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = userProfile?.followers.includes(user?._id);

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPost =
    activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader color="#3b82f6" size={150} />
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-red-400">
        Error loading profile. Please try again later.
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col">
        {/* Profile + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
          {/* Profile Info */}
          <section className="flex flex-col items-center">
            <Avatar
              alt="profilephoto"
              src={userProfile?.profilePicture}
              sx={{
                width: { xs: 96, sm: 120, md: 144 },
                height: { xs: 96, sm: 120, md: 144 },
                border: '4px solid #3b82f6',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            />
            <div className="mt-6 text-center">
              <Typography
                variant="h5"
                sx={{ color: '#ffffff', fontWeight: 600 }}
              >
                {userProfile?.username}
              </Typography>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant="outlined" sx={btnStyle}>
                        Edit profile
                      </Button>
                    </Link>
                    <Button variant="outlined" sx={btnStyle}>
                      View archive
                    </Button>
                    <Button variant="outlined" sx={btnStyle}>
                      Ad tools
                    </Button>
                  </>
                ) : (
                  <>
                    <FollowButton
                      targetUserId={userProfile?._id}
                      isFollowing={isFollowing}
                    />
                    {isFollowing && (
                      <Button
                        variant="outlined"
                        sx={btnStyle}
                        onClick={() => navigate('/chat')}
                      >
                        Message
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Stats + Bio */}
          <section className="mt-6 sm:mt-0">
            <div className="flex gap-8">
              {['posts', 'followers', 'following'].map((key) => (
                <div key={key} className="text-center">
                  <Typography
                    variant="h6"
                    sx={{ color: '#ffffff', fontWeight: 600 }}
                  >
                    {userProfile?.[key]?.length || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                    {key}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Typography
                variant="body1"
                sx={{ color: '#d1d5db', fontWeight: 500 }}
              >
                {userProfile?.bio || 'This user has no bio.'}
              </Typography>

              <div className="mt-3 flex items-center">
                <Badge
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      padding: '0.25rem',
                      borderRadius: '0.5rem',
                    },
                  }}
                >
                  <AtSign className="text-blue-400 mr-1" size={18} />
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    {userProfile?.username}
                  </Typography>
                </Badge>
              </div>
            </div>
          </section>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-700 mt-12 w-full">
          <div className="flex justify-center gap-12 text-lg">
            {['posts', 'saved'].map((tab) => (
              <Typography
                key={tab}
                className={`py-4 cursor-pointer ${
                  activeTab === tab
                    ? 'text-blue-400 font-bold border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => handleTabChange(tab)}
                sx={{ fontWeight: activeTab === tab ? 600 : 400 }}
              >
                {tab.toUpperCase()}
              </Typography>
            ))}
          </div>

          {/* Posts */}
          {displayedPost?.length === 0 ? (
            <div className="text-center text-gray-400 mt-6">
              No {activeTab === 'posts' ? 'posts' : 'saved posts'} to display.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {displayedPost?.map((post) => (
                <div key={post?._id} className="relative group">
                  <img
                    src={post.image}
                    alt="post"
                    className="rounded-lg w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 shadow-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <div className="flex items-center text-white space-x-6">
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <Heart size={20} />
                        <span>{post?.likes?.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <MessageCircle size={20} />
                        <span>{post?.comments?.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  borderColor: '#3b82f6',
  color: '#3b82f6',
  borderRadius: '0.75rem',
  textTransform: 'none',
  '&:hover': { backgroundColor: '#3b82f6', color: '#ffffff' },
  px: 3,
  py: 1,
};

export default Profile;

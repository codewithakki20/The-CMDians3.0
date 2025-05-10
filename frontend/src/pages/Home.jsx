import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed';
import CreatePost from './CreatePost';
import useGetAllPost from '../hooks/useGetAllPost';
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers';
import { Container, Typography, Button, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading state if necessary
  setTimeout(() => setLoading(false), 2000); // Simulated loading duration for demo

  const handleNavigation = (type) => {
    if (type === 'Create') {
      setOpenPostDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-blue-900 to-blue-600 text-white py-20 px-4 md:px-12">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text */}
            <div className="text-center md:text-left max-w-lg">
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffffff', mb: 3 }}>
                CMD College Memories
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#d1d5db', opacity: 0.9, mb: 6, lineHeight: 1.6 }}
              >
                Capture, share, and relive your best college moments. Join our community and preserve
                your academic journey forever.
              </Typography>

              {/* Blue Share Memories Button */}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleNavigation('Create')}
                sx={{
                  backgroundColor: '#3b82f6', // Tailwind blue-500
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: '0.75rem',
                  '&:hover': {
                    backgroundColor: '#2563eb', // Tailwind blue-600
                  },
                }}
              >
                Share your memories
              </Button>
            </div>

            {/* Graphic */}
            <div className="flex justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-500/50 bg-blue-500/10 backdrop-blur-md shadow-xl">
                <img src="/logo192.png" alt="Memories" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Feed Section */}
      <div className="w-full px-4 sm:px-8 py-16 flex justify-center">
        <div className="w-full max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <ClipLoader size={70} color="#3b82f6" />
            </div>
          ) : (
            <>
              <Feed />
              <Outlet />
            </>
          )}
        </div>
      </div>

      {/* Post Modal */}
      <CreatePost open={openPostDialog} setOpen={setOpenPostDialog} />
    </div>
  );
};

export default Home;

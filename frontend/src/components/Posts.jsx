import React from 'react';
import Post from '../pages/Post';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper } from '@mui/material';

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  return (
    <Box className="px-4 py-8 bg-gray-900 min-h-screen">
      <Grid container spacing={3} className="justify-center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
            <Paper
              elevation={5}
              sx={{
                borderRadius: '1rem',
                backgroundColor: '#1f2937',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)',
                },
              }}
            >
              <Post post={post} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;

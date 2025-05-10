import React, { useState } from 'react';
import Posts from './Posts';
import { Typography, Box, Button, Container } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Feed = ({ filter = 'Latest' }) => {
  const [sortBy, setSortBy] = useState(filter);

  // Handle sort change
  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  return (
    <div className="bg-amber-50 py-12">
      {/* Header Section */}
      <Container maxWidth="lg">
        <Box className="text-center mb-8">
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}
            className="animate-fade-in"
          >
            CMDians' Best Moments 🍂
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#4b5563', opacity: 0.9 }}
          >
            Relive the warmth of college life with our community's top memories.
          </Typography>
        </Box>

        {/* Sort Filter Bar */}
        <Box className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {['Latest', 'Popular', 'Category'].map((type) => (
              <Button
                key={type}
                variant={sortBy === type ? 'contained' : 'outlined'}
                onClick={() => handleSort(type)}
                sx={{
                  backgroundColor: sortBy === type ? '#f97316' : 'transparent',
                  color: sortBy === type ? '#ffffff' : '#1f2937',
                  borderColor: '#f97316',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: '1rem',
                  '&:hover': {
                    backgroundColor: sortBy === type ? '#ea580c' : '#fee2e2',
                  },
                }}
                className="transition-transform duration-200 hover:scale-105"
              >
                {type}
              </Button>
            ))}
          </div>
          <Button
            startIcon={<FilterListIcon />}
            sx={{ color: '#1f2937', textTransform: 'none' }}
            className="hover:bg-gray-200 rounded-full"
            aria-label="More filter options"
          >
            Filter
          </Button>
        </Box>

        {/* Posts Section */}
        <Posts sortBy={sortBy} />
      </Container>
    </div>
  );
};

export default Feed;
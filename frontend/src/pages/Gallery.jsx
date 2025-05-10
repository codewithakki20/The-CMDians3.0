import React, { useState, useEffect } from 'react';
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Chip,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { Close as CloseIcon, Share as ShareIcon } from '@mui/icons-material';
import { ClipLoader } from 'react-spinners';

// Dummy memories data
const memories = [
  { id: 1, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi1.jpg', category: 'parsahi' },
  { id: 2, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi2.jpg', category: 'parsahi' },
  { id: 3, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi3.jpg', category: 'parsahi' },
  { id: 4, title: 'College Trip to Parsahi', description: 'Our amazing trip to Parsahi, full of adventure!', imageUrl: '/Parsahi/Parsahi4.jpg', category: 'parsahi' },
  { id: 5, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh1.jpg', category: 'chaturgarh' },
  { id: 6, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh2.jpg', category: 'chaturgarh' },
  { id: 7, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh3.jpg', category: 'chaturgarh' },
  { id: 8, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh4.jpg', category: 'chaturgarh' },
  { id: 9, title: 'College Trip to Chaturgarh', description: 'Our amazing trip to Chaturgarh, full of adventure!', imageUrl: '/Chaturgarh/Chaturgarh5.jpg', category: 'chaturgarh' },
  { id: 10, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland1.jpg', category: 'goldenisland' },
  { id: 11, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland2.jpg', category: 'goldenisland' },
  { id: 12, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland3.jpg', category: 'goldenisland' },
  { id: 13, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland4.jpg', category: 'goldenisland' },
  { id: 14, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland5.jpg', category: 'goldenisland' },
  { id: 15, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland6.jpg', category: 'goldenisland' },
  { id: 16, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland7.jpg', category: 'goldenisland' },
  { id: 17, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland8.jpg', category: 'goldenisland' },
  { id: 18, title: 'College Trip to Golden Island', description: 'Our amazing trip to Golden Island, full of adventure!', imageUrl: '/Golden Island/GoldenIsland9.jpg', category: 'goldenisland' },
  { id: 19, title: 'Last day of college', description: 'Farewell moments filled with memories!', imageUrl: '/Last day/Last day1.jpg', category: 'lastday' },
  { id: 20, title: 'Last day of college', description: 'Saying goodbye with joy and tears.', imageUrl: '/Last day/Last day2.jpg', category: 'lastday' },
  { id: 21, title: 'Last day of college', description: 'Final day vibes with friends.', imageUrl: '/Last day/Last day3.jpg', category: 'lastday' },
  { id: 22, title: 'Last day of college', description: 'Closing a beautiful chapter.', imageUrl: '/Last day/Last day4.jpg', category: 'lastday' },
  { id: 23, title: 'Pre Holi celebration', description: 'Colors of joy and celebration!', imageUrl: '/Holi/Holi1.jpg', category: 'holi' },
  { id: 24, title: 'Pre Holi celebration', description: 'Holi fun before exams!', imageUrl: '/Holi/Holi2.jpg', category: 'holi' },
  { id: 25, title: 'Pre Holi celebration', description: 'Splash of colors with friends.', imageUrl: '/Holi/Holi3.jpg', category: 'holi' },
  { id: 26, title: 'Pre Holi celebration', description: 'Festival of colors in full swing!', imageUrl: '/Holi/Holi4.jpg', category: 'holi' },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'goldenisland', label: 'Golden Island' },
  { id: 'chaturgarh', label: 'Chaturgarh' },
  { id: 'parsahi', label: 'Parsahi' },
  { id: 'holi', label: 'Holi' },
  { id: 'lastday', label: 'Last Day' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null); // For Alert messages
  const [loading, setLoading] = useState(false); // For loading spinner

  const filteredMemories = memories.filter(memory =>
    selectedCategory === 'all' ? true : memory.category === selectedCategory
  );

  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMemory(null);
  };

  const handleShare = async () => {
    if (navigator.share && selectedMemory) {
      try {
        await navigator.share({
          title: selectedMemory.title,
          text: selectedMemory.description,
          url: window.location.href,
        });
      } catch (error) {
        setAlert({ message: 'Error sharing the memory.', severity: 'error' });
      }
    }
  };

  // Simulate loading process
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds (simulate data fetch)
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-10">
      <Container maxWidth="xl">
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffffff', mb: 2 }}>
            📸 CMDians Memories
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#9ca3af', fontSize: '1.1rem' }}>
            Relive the golden moments of college life!
          </Typography>
        </Box>

        {/* Category Filter */}
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" mb={6}>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory(category.id)}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1,
                backgroundColor: selectedCategory === category.id ? '#3b82f6' : 'transparent',
                color: selectedCategory === category.id ? '#ffffff' : '#3b82f6',
                borderColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: selectedCategory === category.id ? '#2563eb' : '#3b82f6',
                  color: '#ffffff',
                },
              }}
            >
              {category.label}
            </Button>
          ))}
        </Stack>

        {/* Alert */}
        {alert && (
          <Alert
            severity={alert.severity || 'info'}
            sx={{ mb: 3 }}
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <ClipLoader color="#3b82f6" size={60} />
          </Box>
        ) : (
          <>
            {/* Memories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredMemories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => handleMemoryClick(memory)}
                  className="cursor-pointer rounded-xl overflow-hidden bg-gray-800 shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="w-full h-48 object-cover"
                  />
                  <Box p={3}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }} className="truncate">
                      {memory.title}
                    </Typography>
                    <Chip
                      label={memory.category}
                      size="small"
                      sx={{
                        backgroundColor: '#374151',
                        color: '#ffffff',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: '1rem', backgroundColor: '#1f2937' },
          }}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                Memory Details
              </Typography>
              <Box>
                <IconButton onClick={handleShare} sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}>
                  <ShareIcon />
                </IconButton>
                <IconButton onClick={handleCloseDialog} sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ backgroundColor: '#1f2937' }}>
            {selectedMemory && (
              <Box>
                <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
                  <img
                    src={selectedMemory.imageUrl}
                    alt={selectedMemory.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </Box>
                <Typography variant="h5" sx={{ color: '#ffffff', mt: 3, fontWeight: 600 }}>
                  {selectedMemory.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#d1d5db', mt: 2, lineHeight: 1.6 }}>
                  {selectedMemory.description}
                </Typography>
                <Chip
                  label={selectedMemory.category}
                  sx={{ mt: 2, backgroundColor: '#374151', color: '#ffffff', fontWeight: 500 }}
                />
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default Gallery;

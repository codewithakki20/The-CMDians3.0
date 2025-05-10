import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  Message as MessageIcon,
  AddBox as AddIcon,
  Favorite as FavoriteIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Group as GroupIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
import { setPosts, setSelectedPost } from "../redux/postSlice";
import CreatePost from "../pages/CreatePost";
import server from "../api/axiosInstance";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const hideMobileMenuIcon = location.pathname === "/login" || location.pathname === "/signup";

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const openMobileMenu = Boolean(mobileAnchorEl);

  const [openPostDialog, setOpenPostDialog] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMobileMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileAnchorEl(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
    handleMenuClose();
    handleMobileMenuClose();
  };

  const handleNavigation = (type) => {
    switch (type) {
      case "Home":
        navigate("/");
        break;
      case "Messages":
        navigate("/chat");
        break;
      case "Create":
        setOpenPostDialog(true);
        break;
      case "Users":
        navigate("/users");
        break;
      case "Gallery":
        navigate("/gallery");
        break;
      case "Profile":
        navigate(`/profile/${user?._id}`);
        break;
      case "Notifications":
        toast.info("Notifications feature coming soon.");
        break;
      default:
        break;
    }
    handleMenuClose();
    handleMobileMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        background: '#1f2937',
        borderBottom: '1px solid #374151',
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} className="px-4">
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: '#3b82f6', fontWeight: 700, fontSize: '1.5rem', textDecoration: 'none' }}
          >
            The CMDian Memories
          </Typography>
        </Box>

        {/* Mobile Menu Icon */}
        {isMobile && !hideMobileMenuIcon && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{ color: '#9ca3af', '&:hover': { color: '#3b82f6' } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileAnchorEl}
              open={openMobileMenu}
              onClose={handleMobileMenuClose}
              PaperProps={{
                elevation: 4,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: '0.75rem',
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                },
              }}
            >
              {["Home", "Gallery", "Users", "Create", "Messages", "Notifications", "Profile"].map((item, index) => (
                <MenuItem
                  key={item}
                  onClick={() => handleNavigation(item)}
                  sx={{ '&:hover': { backgroundColor: '#374151' } }}
                >
                  {getIcon(item, index)}
                  {item}
                </MenuItem>
              ))}
              <Divider sx={{ backgroundColor: '#374151' }} />
              <MenuItem onClick={logoutHandler} sx={{ color: '#ef4444' }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#ef4444' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}

        {/* Desktop Navigation */}
        {!isMobile && user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {["Home", "Gallery", "Users", "Messages", "Create", "Notifications"].map((item) => (
              <NavItem key={item} label={item} icon={getIcon(item)} onClick={handleNavigation} />
            ))}
          </Box>
        )}

        {/* Profile Avatar (Desktop Only) */}
        {user && !isMobile && (
          <IconButton onClick={handleMenuOpen} size="small" sx={{ p: 0 }}>
            <Avatar
              src={user.profilePicture || "/default-profile.jpg"}
              alt={user.username}
              sx={{ width: 40, height: 40, border: '2px solid #3b82f6' }}
            />
          </IconButton>
        )}

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              minWidth: 160,
              borderRadius: '0.75rem',
              backgroundColor: '#1f2937',
              color: '#ffffff',
            },
          }}
        >
          <MenuItem onClick={() => handleNavigation("Profile")} sx={{ '&:hover': { backgroundColor: '#374151' } }}>
            My Profile
          </MenuItem>
          <Divider sx={{ backgroundColor: '#374151' }} />
          <MenuItem onClick={logoutHandler} sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#374151' } }}>
            <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#ef4444' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>

      <CreatePost open={openPostDialog} setOpen={setOpenPostDialog} />
    </AppBar>
  );
};

// Get corresponding icon for each navigation item
const getIcon = (label) => {
  const icons = {
    Home: <HomeIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
    Gallery: <PhotoLibraryIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
    Users: <GroupIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
    Messages: <MessageIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
    Create: <AddIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
    Notifications: <FavoriteIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
    Profile: <AccountIcon fontSize="small" sx={{ mr: 1, color: '#9ca3af' }} />,
  };
  return icons[label];
};

// Navigation Item Component
const NavItem = ({ label, icon, onClick }) => (
  <Button
    startIcon={icon}
    onClick={() => onClick(label)}
    sx={{
      color: '#ffffff',
      fontWeight: 500,
      px: 2,
      py: 1,
      borderRadius: '0.75rem',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#374151',
        color: '#3b82f6',
      },
    }}
  >
    {label}
  </Button>
);

export default Navbar;

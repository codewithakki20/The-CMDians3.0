import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/authSlice';
import {
    Avatar,
    Button,
    TextField,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Typography,
    Grid,
    Paper
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import server from '../api/axiosInstance';

const EditProfile = () => {
    const imageRef = useRef();
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    };

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${server}/api/v1/user/profile/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePicture: res.data.user?.profilePicture,
                    gender: res.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <Paper elevation={5} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 'lg', backgroundColor: '#1f2937' }}>
                <section className="flex flex-col gap-8 lg:w-full">
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#ffffff', mb: 4 }}>
                        Edit Profile
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                <Avatar
                                    alt="Profile Picture"
                                    src={user?.profilePicture}
                                    sx={{ width: 64, height: 64, border: '2px solid #3b82f6' }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-8">
                                <div>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#ffffff' }}>
                                        {user?.username}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                        {user?.bio || 'Bio here...'}
                                    </Typography>
                                </div>
                                <div>
                                    <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
                                    <Button
                                        onClick={() => imageRef?.current.click()}
                                        variant="contained"
                                        sx={{
                                            borderRadius: '0.75rem',
                                            backgroundColor: '#3b82f6',
                                            '&:hover': { backgroundColor: '#2563eb' },
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 4,
                                            py: 1,
                                        }}
                                    >
                                        Change Photo
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <div>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                            Bio
                        </Typography>
                        <TextField
                            value={input.bio}
                            onChange={(e) => setInput({ ...input, bio: e.target.value })}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Write something about yourself..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '0.75rem',
                                    backgroundColor: '#374151',
                                    color: '#ffffff',
                                    '& fieldset': {
                                        borderColor: '#4b5563',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#3b82f6',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3b82f6',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: '#ffffff',
                                },
                            }}
                        />
                    </div>

                    <div>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                            Gender
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel
                                id="gender-label"
                                sx={{ color: '#9ca3af', '&.Mui-focused': { color: '#3b82f6' } }}
                            >
                                Gender
                            </InputLabel>
                            <Select
                                labelId="gender-label"
                                value={input.gender}
                                onChange={(e) => selectChangeHandler(e.target.value)}
                                label="Gender"
                                sx={{
                                    borderRadius: '0.75rem',
                                    backgroundColor: '#374151',
                                    color: '#ffffff',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4b5563',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3b82f6',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3b82f6',
                                    },
                                    '& .MuiSelect-icon': {
                                        color: '#9ca3af',
                                    },
                                }}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="flex justify-end mt-8">
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <ClipLoader size={35} color="#3b82f6" />
                                <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
                                    Updating profile...
                                </Typography>
                            </div>
                        ) : (
                            <Button
                                onClick={editProfileHandler}
                                variant="contained"
                                sx={{
                                    borderRadius: '0.75rem',
                                    backgroundColor: '#3b82f6',
                                    '&:hover': { backgroundColor: '#2563eb' },
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1,
                                }}
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </section>
            </Paper>
        </div>
    );
};

export default EditProfile;

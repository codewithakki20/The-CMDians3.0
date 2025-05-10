import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        suggestedUsers: [],
        userProfile: null,
        selectedUser: null,
    },
    reducers: {
        // Actions
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        followUser: (state, action) => {
            const userId = action.payload;
            
            // Add user to the profile followers list (if not already followed)
            if (state.userProfile && !state.userProfile.followers.includes(userId)) {
                state.userProfile.followers.push(userId);
            }
            
            // Add the user to the following list of the logged-in user (if not already following)
            if (state.user && !state.user.following.includes(userId)) {
                state.user.following.push(userId);
            }
        },
        unfollowUser: (state, action) => {
            const userId = action.payload;
            
            // Remove user from the profile followers list (if following)
            if (state.userProfile) {
                state.userProfile.followers = state.userProfile.followers.filter(id => id !== userId);
            }
            
            // Remove the user from the following list of the logged-in user (if following)
            if (state.user) {
                state.user.following = state.user.following.filter(id => id !== userId);
            }
        },
    },
});

export const { setAuthUser, setSuggestedUsers, setUserProfile, setSelectedUser, followUser, unfollowUser } = authSlice.actions;
export default authSlice.reducer;

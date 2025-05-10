// src/redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: [],
    messages: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((msg) => msg._id !== action.payload);
    },
    updateMessage: (state, action) => {
      const index = state.messages.findIndex((msg) => msg._id === action.payload._id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
  },
});

export const {
  setOnlineUsers,
  setMessages,
  addMessage,
  deleteMessage,
  updateMessage,
} = chatSlice.actions;

export default chatSlice.reducer;

// src/redux/chatActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addMessage } from './chatSlice';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ recipientId, message }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('/api/messages', { recipientId, message });
      dispatch(addMessage(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

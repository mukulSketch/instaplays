import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  status: {
    login: false,
    darkTheme: false,
    data: [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Education', 'Finance'],
        author: 'Bruno Hills',
        date: 'Apr 16 2023',
        country: 'India',
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Education', 'Finance'],
        author: 'Bruno Hills',
        date: 'Apr 16 2023',
        country: 'India',
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Sports', 'Finance'],
        author: 'Bruno Hills',
        date: 'Apr 16 2023',
        country: 'Germany',
      },
      {
        id: 4,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Sports', 'Finance'],
        author: 'Bruno Hills',
        date: 'Apr 16 2023',
        country: 'United Kingdom',
      },
      {
        id: 5,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Sports', 'Finance'],
        author: 'Bruno Hills',
        date: 'Apr 16 2023',
        country: 'India',
      },
      {
        id: 6,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '16 Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Sports', 'Finance'],
        author: 'Bruno Hills',
        date: 'Nov 16 2023',
        country: 'India',
      },
      {
        id: 7,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '16 Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Sports', 'Finance'],
        author: 'Bruno Hills',
        date: 'Nov 18 2023',
        country: 'India',
      },
      {
        id: 8,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '16 Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Esports'],
        author: 'Mukul',
        date: 'Nov 18 2023',
        country: 'India',
      },
      {
        id: 9,
        image:
          'https://images.unsplash.com/photo-1700771266232-7a31af68eb31?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '16 Top 7 Product Feedback Software Tools For 2023',
        description:
          "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
        category: ['Esports'],
        author: 'MM',
        date: 'Nov 18 2023',
        country: 'India',
      },
    ],
    movieApp: false,
  },
};

let appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    appStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(fetchData.pending, () => {
  //     console.log('loading');
  //   }),
  //     builder.addCase(fetchData.fulfilled, (state, action) => {
  //       state.status.data = action.payload;
  //     }),
  //     builder.addCase(fetchData.rejected, () => {
  //       console.log('rejected');
  //     });
  // },
});

export const {appStatus} = appStatusSlice.actions;
export default appStatusSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = 'https://api.socialcontinent.xyz/api/v1/post/suggested';


export const fetchPosts = createAsyncThunk('fetchPosts', async (res, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL, res);
    return response.json();

  } catch (error) {
    console.error(error)
    return rejectWithValue
  }

});

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action) => {
      const post = state.posts.find((post) => post.hash === action.payload);
      if (post) {
        if (post.isLiked) {
          post.likes.count -= 1;
        } else {
          post.likes.count += 1;
        }
        post.isLiked = !post.isLiked;
      }
    },
    commentPost: (state, action) => {
      const post = state.items.find(post => post.id === action.payload);
      if (post) post.comments += 1;
    },
    repostPost: (state, action) => {
      const post = state.items.find(post => post.id === action.payload);
      if (post) post.reposts += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { likePost, commentPost, repostPost, } = postsSlice.actions;

export default postsSlice.reducer;

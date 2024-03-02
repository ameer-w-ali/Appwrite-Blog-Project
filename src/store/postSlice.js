import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: []
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, actions) => {
      state.list = actions.payload
    },
    getpost:(state,actions) =>{
      
    }
  }
})

export const { getPosts } = postSlice.actions;

export default postSlice.reducer;
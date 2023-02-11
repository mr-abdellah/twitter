import { createSlice } from "@reduxjs/toolkit";

const tweetsSlices = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
  },
  reducers: {
    addTweets: (state, action) => {
      state.tweets = [...action.payload];
    },
    updateTweet: async (state, action) => {
      const newState = state.tweets.map((tweet) => {
        if (tweet?.ownerId === action.payload) {
          return {
            ...tweet,
            ...(tweet.likes = [likes, ...action.payload]),
          };
        }
        return tweet;
      });
      return [...state.tweets, newState];
    },
  },
});

export const { addTweets, updateTweet } = tweetsSlices.actions;

export default tweetsSlices.reducer;

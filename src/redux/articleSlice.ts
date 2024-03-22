import { createSlice } from '@reduxjs/toolkit';

type Articles = {
  id: number;
  title: string;
  summary: string;
};

type State = {
  articles: Articles[];
};

const initialState: State = {
  articles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    receivedArticles(state, action) {
      return {
        ...state,
        articles: action.payload,
      };
    },
  },
});

export const { receivedArticles } = articlesSlice.actions;

export default articlesSlice.reducer;

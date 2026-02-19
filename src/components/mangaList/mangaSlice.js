import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mangaList: [],
    mangaLoadingStatus: 'idle',
    mangaListEnded: false,
    listPage: 1
}

const mangaSlice = createSlice({
    name: 'mangaList',
    initialState,
    reducers: {
        mangaFetching: state => {state.mangaLoadingStatus = 'loading'},
        mangaFetched: (state, action) => {
            state.mangaLoadingStatus = 'idle';
            state.mangaList.push(...action.payload);
            state.listPage += 1;
        },
        mangaFetchingError: state => {state.mangaLoadingStatus = 'error'},
        mangaEnded: state => {state.mangaEnded = true},
        resetManga: state => initialState
    }
});

const {actions, reducer} = mangaSlice;

export default reducer;

export const {
    mangaFetching,
    mangaFetched,
    mangaFetchingError,
    mangaEnded,
    resetManga
} = actions;
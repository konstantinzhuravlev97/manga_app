import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    charactersList: [],
    charactersLoadingStatus: 'idle',
    charactersListEnded: false,
    listPage: 1
}

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        charactersFetching: state => {state.charactersLoadingStatus = 'loading'},
        charactersFetched: (state, action) => {
            state.charactersLoadingStatus = 'idle';
            state.charactersList.push(...action.payload);
            state.listPage += 1;
        },
        charactersFetchingError: state => {state.charactersLoadingStatus = 'error'},
        charactersEnded: state => {state.charactersListEnded = true},
        resetCharacters: state => initialState
    }
});

const {actions, reducer} = charactersSlice;

export default reducer;

export const {
    charactersFetching,
    charactersFetched,
    charactersFetchingError,
    charactersEnded,
    resetCharacters
} = actions;
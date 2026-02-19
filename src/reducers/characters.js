const initialState = {
    charactersList: [],
    charactersLoadingStatus: 'idle',
    listPage: 1,
    charactersEnded: false,
}

const characters = (state = initialState, action) => {
    switch (action.type) {
        case 'CHARACTERS_FETCHING':
            return {
                ...state,
                charactersLoadingStatus: 'loading'
            }
        case 'CHARACTERS_FETCHED':
            return {
                ...state,
                charactersList: [...state.charactersList, ...action.payload],
                listPage: state.listPage + 1,
                charactersLoadingStatus: 'idle'
            }
        case 'CHARACTERS_FETCHING_ERROR':
            return {
                ...state,
                charactersLoadingStatus: 'error'
            }
        case 'CHARACTERS_ENDED':
            return {
                ...state,
                charactersEnded: true
            }
        default: return state
    }
}

export default characters;
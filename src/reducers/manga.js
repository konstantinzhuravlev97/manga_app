const initialState = {
    mangaList: [],
    mangaLoadingStatus: 'idle',
    listPage: 1,
    mangaEnded: false

}

const manga = (state = initialState, action) => {
    switch (action.type) {
        case 'MANGA_LIST_FETCHING':
            return {
                ...state,
                mangaLoadingStatus: 'loading'
            }
        case 'MANGA_LIST_FETCHED':
            return {
                ...state,
                mangaList: [...state.mangaList, ...action.payload],
                listPage: state.listPage + 1,
                mangaLoadingStatus: 'idle'
            }
        case 'MANGA_LIST_FETCHING_ERROR':
            return {
                ...state,
                mangaLoadingStatus: 'error'
            }
        case 'MANGA_LIST_ENDED':
            return {
                ...state,
                mangaEnded: true
            }
        default: return state
    }
}

export default manga;
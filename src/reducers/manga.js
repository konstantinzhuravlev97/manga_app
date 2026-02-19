const initialState = {
    mangaList: [],
    mangaLoadingStatus: 'idle',
    listPage: 1,
    mangaEnded: false,
    selectedManga: null,
    selectedMangaId: null,
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
        // case 'MANGA_SELECTED':
        //     return {
        //         ...state,
        //         selectedManga: action.payload
        //     }
        // case 'MANGA_SELECTED_ID':
        //     return {
        //         ...state,
        //         selectedMangaId: action.payload
        //     }
        default: return state
    }
}

export default manga;
export const fetchCharacters = (request, page, method) => (dispatch) => {
    request(page)
        .then(data => dispatch(charactersFetched(data)))
        .then(data => method(data.payload))
        .catch(() => dispatch(charactersFetchingError))
}

export const fetchManga = (request, page, method) => (dispatch) => {
    request(page)
        .then(data => dispatch(mangaListFetched(data)))
        .then(data => method(data.payload))
        .catch(() => dispatch(mangaListFetchingError))
}

export const charactersFetching = () => {
    return {
        type: 'CHARACTERS_FETCHING'
    }
}

export const charactersFetched = (characters) => {
    return {
        type: 'CHARACTERS_FETCHED',
        payload: characters
    }
}

export const charactersFetchingError = () => {
    return {
        type: 'CHARACTERS_FETCHING_ERROR'
    }
}

export const charactersEnded = () => {
    return {
        type: 'CHARACTERS_ENDED'
    }
}

// export const characterSelected = (character) => {
//     return {
//         type: 'CHARACTER_SELECTED',
//         payload: character
//     }
// }

// export const characterSelectedId = (id) => {
//     return {
//         type: 'CHARACTER_SELECTED_ID',
//         payload: id
//     }
// }

export const mangaListFetching = () => {
    return {
        type: 'MANGA_LIST_FETCHING'
    }
}

export const mangaListFetched = (mangaList) => {
    return {
        type: 'MANGA_LIST_FETCHED',
        payload: mangaList
    }
}

export const mangaListFetchingError = () => {
    return {
        type: 'MANGA_LIST_FETCHING_ERROR'
    }
}

export const mangaListEnded = () => {
    return {
        type: 'MANGA_LIST_ENDED'
    }
}

// export const mangaSelected = (manga) => {
//     return {
//         type: 'MANGA_SELECTED',
//         payload: manga
//     }
// }

// export const mangaSelectedId = (id) => {
//     return {
//         type: 'MANGA_SELECTED_ID',
//         payload: id
//     }
// }

// export const animeFetching = () => {
//     return {
//         type: 'ANIME_FETCHING'
//     }
// }

// export const animeFetched = (anime) => {
//     return {
//         type: 'ANIME_FETCHED',
//         payload: anime
//     }
// }

// export const animeFetchingError = () => {
//     return {
//         type: 'ANIME_FETCHING_ERROR'
//     }
// }

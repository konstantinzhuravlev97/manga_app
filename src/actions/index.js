import { charactersFetched, charactersFetchingError} from "../components/charList/charactersSlice"
import { mangaFetched, mangaFetchingError } from "../components/mangaList/mangaSlice"

export const fetchCharacters = (request, page, method) => (dispatch) => {
    request(page)
        .then(data => dispatch(charactersFetched(data)))
        .then(data => method(data.payload))
        .catch(() => dispatch(charactersFetchingError()))
}

export const fetchManga = (request, page, method) => (dispatch) => {
    request(page)
        .then(data => dispatch(mangaFetched(data)))
        .then(data => method(data.payload))
        .catch(() => dispatch(mangaFetchingError()))
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



// export const mangaListChanged = () => {
//     return {
//         type: 'MANGA_LIST_CHANGED'
//     }
// }



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

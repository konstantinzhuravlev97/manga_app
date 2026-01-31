import {useHttp} from '../hooks/http.hook';

const useJikanService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://api.jikan.moe/v4/';
    const _basePage = 1;

    const getAllCharacters = async (page = _basePage) => {
        const res = await request(`${_apiBase}characters?limit=9&page=${page}`);
        return res.data.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}/full`);
        return _transformCharacter(res.data);
    }

    const checkDescriptionLength = (item, number) => {
        let res;
        if (item) {
            if (item.length > number) {
                res = `${item.slice(0, +number)}...`;
            } else {
                res = item;
            }
        } else {
            res = 'There is no desription for this character';
        }
        return res;
    }

    const checkListLength = (item, number) => {
        let res;
        if (item && item.length > 0) {
            if (item.length > number) {
                res = item.slice(0, number);
            } else {
                res = item;
            }
        } else {
            res = 'There is no titles with this character';
        }
        return res;
    }

    const _transformCharacter = (char) => {
        let descr = checkDescriptionLength(char.about, 180);
        let about = checkDescriptionLength(char.about, 600);

        let animeList = checkListLength(char.anime, 7);
        let mangaList = checkListLength(char.manga, 7);

        return {
            id: char.mal_id,
            name: char.name,
            description: descr,
            about: about,
            thumbnail: char.images.jpg.image_url,
            anime: animeList,
            manga: mangaList,
            homepage: char.url,
            wiki: null,
        }
    }

    return {loading, error, clearError, getCharacter, getAllCharacters}
}

export default useJikanService;
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

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?q=${name}`);
        return res.data.map(_transformCharacter);
    }

    const getAllManga = async (page = _basePage) => {
        const res = await request(`${_apiBase}manga?limit=8&page=${page}`);
        return res.data.map(_transformManga);
    }

    const getManga = async (id) => {
        const res = await request(`${_apiBase}manga/${id}/full`);
        return _transformManga(res.data);
    }

    const getAnime = async (id) => {
        const res = await request(`${_apiBase}anime/${id}/full`);
        return _transformAnime(res.data);
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
                res = item.slice(0, +number);
            } else {
                res = item;
            }
        } else {
            res = 'There is no titles with this character';
        }
        return res;
    }


    const getTitle = (arr) => {
        let title;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === 'English') {
                title = arr[i].title;
                break;
            } else {
                title = arr[0].title;
            }

        }
        return title;
    }

    const getGenres = (arr) => {
        let genres = '';
        if (arr) {
            arr.map(item => {
                genres += `${item.name} / `;
            })
            genres = genres.slice(0, genres.length - 3);
        } else {
            genres = 'There is no information about this title genres'
        }
        return genres;
    }

    const _transformCharacter = (char) => {
        // let descr = checkDescriptionLength(char.about, 180);
        // let about = checkDescriptionLength(char.about, 600);

        // let animeList = checkListLength(char.anime, 7);
        // let mangaList = checkListLength(char.manga, 7);

        return {
            id: char.mal_id,
            name: char.name,
            description: checkDescriptionLength(char.about, 180),
            about: checkDescriptionLength(char.about, 600),
            thumbnail: char.images.jpg.image_url,
            anime: checkListLength(char.anime, 7),
            manga: checkListLength(char.manga, 7),
            homepage: char.url,
            wiki: null,
        }
    }

    const _transformManga = (manga) => {

        return {
            id: manga.mal_id,
            title: getTitle(manga.titles),
            description: manga.synopsis ? manga.synopsis : 'There is no description about this title',
            status: manga.status,
            genres: getGenres(manga.genres),
            chapters: manga.chapters ? manga.chapters : 'no accurate information',
            volumes: manga.volumes ? manga.volumes : 'no accurate information',
            thumbnail: manga.images.jpg.image_url,
            homepage: manga.url,
        }
    }

    const _transformAnime = (anime) => {

        return {
            id: anime.mal_id,
            title: getTitle(anime.titles),
            description: anime.synopsis ? anime.synopsis : 'There is no description about this title',
            year: anime.year ? anime.year : 'no accurate info',
            trailer: anime.trailer,
            status: anime.status,
            genres: getGenres(anime.genres),
            thumbnail: anime.images.jpg.image_url,
            homepage: anime.url,
            relations: anime.relations,

        }
    }

    return {loading, error, clearError, getCharacter, getCharacterByName, getAllCharacters, getAllManga, getManga, getAnime}
}

export default useJikanService;

class JikanService {
    _apiBase = 'https://api.jikan.moe/v4/';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9`);
        return res.data.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}/full`);
        return this._transformCharacter(res.data);
    }

    checkDescriptionLength = (item, number) => {
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

    checkListLength = (item, number) => {
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

    _transformCharacter = (char) => {
        let descr = this.checkDescriptionLength(char.about, 180);
        let about = this.checkDescriptionLength(char.about, 600);

        let animeList = this.checkListLength(char.anime, 7);
        let mangaList = this.checkListLength(char.manga, 7);

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
}

export default JikanService;
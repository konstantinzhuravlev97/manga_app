
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

    _transformCharacter = (char) => {
        let descr = char.about;
        if (descr && descr.length > 0) {
            if (descr.length > 180) {
                descr = `${descr.slice(0, 180)}...`;
            }
        } else {
            descr = 'There is no desription for this character';
        }
        return {
            name: char.name,
            description: descr,
            thumbnail: char.images.jpg.image_url,
            homepage: char.url,
            wiki: null,
            id: char.mal_id
        }
    }
}

export default JikanService;
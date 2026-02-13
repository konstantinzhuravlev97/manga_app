import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {
   
    const {name, about, anime, manga, thumbnail} = data;
        
    let animeList, mangaList;

    if (anime) {
        if (typeof(anime) === 'string') {
            animeList = anime;
        } else {
            animeList = anime.map(item => {
                return (
                    <li key={item.anime.mal_id} className="single-char__item">
                        <Link to={`/anime/${item.anime.mal_id}`}>{item.anime.title}</Link>
                    </li>
                )
            });
        }
    }

    if (manga) {
        if (typeof(manga) === 'string') {
            mangaList = manga;
        } else {
            mangaList = manga.map(item => {
                return (
                    <li key={item.manga.mal_id} className="single-char__item">
                        <Link to={`/manga/${item.manga.mal_id}`}>{item.manga.title}</Link>
                    </li>
                )
            });
        }
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                    />
                <title>{name}</title>
            </Helmet>
            <div className="single-char">
                <img src={thumbnail} alt={name} className="single-char__img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{about}</p>
                    <p className="single-char__descr single-char__title">Anime: </p>
                    <ul className="single-char__list">
                        {animeList}
                    </ul>
                    <p className="single-char__descr single-char__title">Manga: </p>
                    <ul className="single-char__list">
                        {mangaList}
                    </ul>
                </div>
            </div>
            <Link 
                style={{'display': 'block',  'textAlign' : 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '60px'}}
                to="/"
                >Back to main page</Link>
        </>
    )
}

export default SingleCharacterLayout;
import { useState, useEffect } from 'react';

import JikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) =>  {
    
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const jikanService = new JikanService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const onCharLoaded = (newChar) => {
        setChar(char => newChar);
        setLoading(loading => false);

    }

    const onCharLoading = () => {
        setLoading(loading => true);
        setError(error => false);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        onCharLoading();
        jikanService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const skeleton = !(error || loading || char) ? <Skeleton/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, about, thumbnail, homepage, wiki, anime, manga} = char

    let animeList, mangaList;
    
    if (typeof(anime) === 'string') {
        animeList = anime;
    } else {
        animeList = anime.map(item => {
            return (
                <li key={item.anime.mal_id} className="char__comics-item">
                    {item.anime.title}
                </li>
            )
        });
    }

    if (typeof(manga) === 'string') {
        mangaList = manga;
    } else {
        mangaList = manga.map(item => {
            return (
                <li key={item.manga.mal_id} className="char__comics-item">
                    {item.manga.title}
                </li>
            )
        });
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{about}</div>
            <div className="char__comics">Anime:</div>
            <ul className="char__comics-list">
                {animeList}
            </ul>
            <div className="char__comics">Manga:</div>
            <ul className="char__comics-list">
                {mangaList}
            </ul>
        </>
    )
}

export default CharInfo;
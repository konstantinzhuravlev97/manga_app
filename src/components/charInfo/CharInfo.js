import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import useJikanService from '../../services/JikanService';

import { characterSelected, characterSelectedId } from '../../actions';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) =>  {
    
    const [char, setChar] = useState(null);

    const {loading, error, clearError, getCharacter} = useJikanService();
    const {selectedCharacter, selectedCharacterId} = useSelector(state => state.characters);
    
    const dispatch = useDispatch();

    useEffect(() => {
        updateChar(selectedCharacterId);
    }, [selectedCharacterId])

    // const onCharLoaded = (char) => {
    //     setChar(char);
    // }

    const updateChar = (id) => {
        // const {charId} = props;
        // if (!charId) {
        //     return;
        // }
        if (!id) {
            return
        }

        clearError();
        getCharacter(id)
            // .then(onCharLoaded)
            .then(data => console.log(data))
            // .then(data => dispatch(characterSelected))
    }

    const skeleton = !(error || loading || char) ? <Skeleton/> : null;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={selectedCharacter}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {/* {errorMessage}
            {spinner} */}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, about, thumbnail, homepage, wiki, anime, manga} = char

    let animeList, mangaList;
    
    if (anime) {
        if (typeof(anime) === 'string') {
            animeList = anime;
        } else {
            animeList = anime.map(item => {
                return (
                    <li key={item.anime.mal_id} className="char__comics-item">
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
                    <li key={item.manga.mal_id} className="char__comics-item">
                        <Link to={`/manga/${item.manga.mal_id}`}>{item.manga.title}</Link>
                    </li>
                )
            });
        }
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
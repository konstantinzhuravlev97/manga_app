import { Component } from 'react';

import JikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    
    state = {
        char: null,
        loading: false,
        error: false
    }

    jikanService = new JikanService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

        onCharLoaded = (char) => {
        this.setState({char,
                loading: false,
            })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.jikanService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

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
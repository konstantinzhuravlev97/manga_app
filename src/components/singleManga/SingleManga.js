import { useState, useEffect } from 'react';

import useJikanService from '../../services/JikanService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleManga.scss';

const SingleManga = (props) => {

    const {loading, error, getManga} = useJikanService();

    const [manga, setManga] = useState(null);

    useEffect(() => {
        onUpdateManga();
    }, [])

    const onMangaLoaded = (manga) => {
        setManga(manga);
    }

    const onUpdateManga = () => {
        const id = Math.floor(Math.random() * (500 - 1) + 1);
        getManga(id)
            .then(onMangaLoaded)
    }

    const View = ({manga}) => {
        const {id, title, description, status, genres, chapters, volumes, thumbnail} = manga;
    
        return (
            <>
                <img src={thumbnail} alt={title} className="single-manga__img"/>
                <div className="single-manga__info">
                    <h2 className="single-manga__name">{title}</h2>
                    <p className="single-manga__descr">{genres}</p>
                    <p className="single-manga__descr">{description}</p>
                    <p className="single-manga__descr">Volumes: {volumes}</p>
                    <p className="single-manga__descr">Chapters: {chapters}</p>
                    <div className="single-manga__price">{status}</div>
                </div>
            </>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !manga) ? <View manga={manga}/> : null;

    return (
        <div className="single-manga">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default SingleManga;
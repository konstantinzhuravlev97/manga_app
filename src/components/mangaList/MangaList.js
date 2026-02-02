import { useState, useEffect } from 'react';

import useJikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './mangaList.scss';


const MangaList = () => {

    const [mangaList, setMangaList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [mangaEnded, setMangaEnded] = useState(false);

    const {loading, error, getAllManga} = useJikanService();


    useEffect(() => {
        onRequest(page, true);
        
    }, []);

    const onRequest = (page, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllManga(page)
            .then(onMangaLoaded)
    }

    const onMangaLoaded = (newMangaList) => {
        let ended = false;
        if (newMangaList < 8) {
            ended = true;
        }

        setMangaList(mangaList => [...mangaList, ...newMangaList]);
        setNewItemLoading(newItemLoading => false);
        setPage(page => page + 1);
        setMangaEnded(mangaEnded => ended);
    }

    function renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <li className="manga__item"
                    key={item.id}
                    tabIndex={0}>
                        <a href='#'>
                            <img src={item.thumbnail} alt={item.title} className="manga__item-img"/>
                            <div className="manga__item-name">{item.title}</div>
                            <div className="manga__item-status">{item.status}</div>
                        </a>
                    </li>
                )}
            )
        return (
            <ul className="manga__grid">
                {items}     
            </ul>
        )   
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    let elements = renderItems(mangaList);

    return (

        <div className="manga__list">
            {errorMessage}
            {spinner}
            {elements}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': mangaEnded ? 'none' : 'block'}}
                onClick={() => onRequest(page)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



export default MangaList;
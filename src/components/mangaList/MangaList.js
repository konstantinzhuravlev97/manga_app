import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useJikanService from '../../services/JikanService';
import { fetchManga} from '../../actions';
import { mangaFetching, mangaEnded, resetManga } from './mangaSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './mangaList.scss';


const MangaList = () => {

    // const [mangaList, setMangaList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    // const [page, setPage] = useState(1);
    // const [mangaEnded, setMangaEnded] = useState(false);


    const {getAllManga} = useJikanService();
    const {mangaList, mangaLoadingStatus, listPage, mangaListEnded} = useSelector(state => state.manga)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(mangaFetching())
        onRequest(listPage, true);

        return () => {
            dispatch(resetManga());
        }
        
    }, []);

    const onMangaLoaded = (data) => {
        if (data.length < 8) {
            dispatch(mangaEnded())
        }
        // setPage(page => page + 1);
        setNewItemLoading(newItemLoading => false);
    }

    const onRequest = (page, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        dispatch(fetchManga(getAllManga, page, onMangaLoaded));
        // getAllManga(page)
        //     .then(onMangaLoaded)
        //     .then(data => dispatch(mangaListFetched(data)))
        //     .then(data => onMangaLoaded(data.payload))
        //     .catch(() => dispatch(mangaListFetchingError))
    };





    // const onMangaLoaded = (newMangaList) => {
    //     let ended = false;
    //     if (newMangaList < 8) {
    //         ended = true;
    //     }

    //     setMangaList(mangaList => [...mangaList, ...newMangaList]);
    //     setNewItemLoading(newItemLoading => false);
    //     setPage(page => page + 1);
    //     setMangaEnded(mangaEnded => ended);
    // }

    function renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <li className="manga__item"
                    key={item.id}
                    tabIndex={0}>
                        <Link to={`/manga/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="manga__item-img"/>
                            <div className="manga__item-name">{item.title}</div>
                            <div className="manga__item-status">{item.status}</div>
                        </Link>
                    </li>
                )}
            )
        return (
            <ul className="manga__grid">
                {items}     
            </ul>
        )   
    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    let elements = renderItems(mangaList);

    if (mangaLoadingStatus === 'loading') {
        return <Spinner/>
    }   else if (mangaLoadingStatus === 'error') {
        return <ErrorMessage/>
    }

    return (

        <div className="manga__list">
            {/* {errorMessage}
            {spinner} */}
            {elements}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': mangaListEnded ? 'none' : 'block'}}
                onClick={() => {
                    onRequest(listPage)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



export default MangaList;
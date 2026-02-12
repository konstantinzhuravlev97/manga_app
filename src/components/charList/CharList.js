import { useState, useEffect, useRef } from 'react';

import useJikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useJikanService();

    useEffect(() => {
        onRequest(page, true);
    }, [])

    const onRequest = (page, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(page)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false);
        setPage(page => page + 1);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="char__item"
                key={item.id}
                tabIndex={0}
                ref={el => itemRefs.current[i] = el}
                onClick={(e) => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                    if (window.scrollY > '500') {
                        e.currentTarget.parentElement.scrollIntoView({behavior: 'smooth', block: 'start'})
                    }

                }}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">    
                {items}
            </ul>
        );
    }

    const elements = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {elements}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(page)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;
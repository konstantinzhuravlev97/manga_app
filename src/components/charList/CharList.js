import { useState, useEffect, useRef } from 'react';

import JikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [charEnded, setCharEnded] = useState(false);

    const jikanService = new JikanService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (page) => {
        onCharListLoading();
        jikanService.getAllCharacters(page)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setPage(page => page + 1);
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
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
                onClick={() => {
                    props.onCharSelected(item.id)
                    focusOnItem(i)
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
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? elements : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
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
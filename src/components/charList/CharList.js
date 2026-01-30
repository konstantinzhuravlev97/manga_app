import { Component } from 'react';

import JikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        page: 1,
        charEnded: false
    }

    jikanService = new JikanService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (page) => {
        this.onCharListLoading();
        this.jikanService.getAllCharacters(page)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, page}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            page: page + 1,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li className="char__item"
                key={item.id}
                tabIndex={0}
                ref={this.setRef}
                onClick={() => {
                    this.props.onCharSelected(item.id)
                    this.focusOnItem(i)
                }}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
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


    render() {

        const {charList, loading, error, newItemLoading, page, charEnded} = this.state;

        const elements = this.renderItems(charList);

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
                    onClick={() => this.onRequest(page)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;
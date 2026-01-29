import { Component } from 'react';

import JikanService from '../../services/JikanService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    jikanService = new JikanService();

    componentDidMount() {
        this.jikanService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            return (
                <li className="char__item"
                key={item.id}>
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

        const {charList, loading, error} = this.state;

        const elements = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;
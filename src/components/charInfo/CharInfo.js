import './charInfo.scss';
import spike from '../../resources/img/spike.jpg';

const CharInfo = () => {
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={spike} alt="spike"/>
                <div>
                    <div className="char__info-name">spike</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                Spike Spiegel is a tall and lean 27-year-old bounty hunter born on Mars. The inspiration for Spike is found in martial artist Bruce Lee who uses the martial arts style of Jeet Kune Do as depicted in Session 8, "Waltz For Venus". He has fluffy, dark green hair (which is inspired by Yusaku Matsuda's) and reddish brown eyes, one of which is artificial and lighter than the other. He is usually dressed in a blue leisure suit, with a yellow shirt and Lupin III inspired boots. A flashback in Session 6 revealed it was his fully functioning right eye which was surgically replaced by the cybernetic one (although Spike himself may not have conscious recollection of the procedure since he claims to have lost his natural eye in an "accident"). One theory is that his natural eye may have been lost during the pre-series massacre in which he supposedly "died". 
            </div>
            <div className="char__comics">Anime:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    	Cowboy Bebop
                </li>
            </ul>
            <div className="char__comics">Manga:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    	Cowboy Bebop
                </li>
            </ul>

        </div>
    )
}

export default CharInfo;
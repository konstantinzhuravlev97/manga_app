import './randomChar.scss';
import spike from '../../resources/img/spike.jpg'
import logo from '../../resources/img/logo.png';

const RandomChar = () => {
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={spike} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">Spike Spiegel</p>
                    <p className="randomchar__descr">
                        Spike Spiegel is a tall and lean 27-year-old bounty hunter born on Mars. The inspiration for Spike is found in martial artist Bruce Lee who uses the martial arts style of Jeet Kune Do as depicted in Session 8, "Waltz For Venus". 
                    </p>
                    <div className="randomchar__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={logo} alt="logo" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;
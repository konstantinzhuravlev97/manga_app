import './mangaList.scss';

const MangaList = () => {
    return (
        <div className="manga__list">
            <ul className="manga__grid">
                <li className="manga__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="manga__item-img"/>
                        <div className="manga__item-name">Cowboy Bebop</div>
                        <div className="manga__item-price">0.00 $</div>
                    </a>
                </li>
                
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default MangaList;
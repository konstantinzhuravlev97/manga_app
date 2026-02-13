import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleMangaLayout.scss';

const SingleMangaLayout = ({data}) => {
    
const {title, description, status, genres, chapters, volumes, thumbnail} = data;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} manga`}
                    />
                <title>{title}</title>
            </Helmet>
            <div className="single-manga">
                <img src={thumbnail} alt={title} className="single-manga__img"/>
                <div className="single-manga__info">
                    <h2 className="single-manga__name">{title}</h2>
                    <p className="single-manga__descr">{genres}</p>
                    <p className="single-manga__descr">{description}</p>
                    <p className="single-manga__descr">Volumes: {volumes}</p>
                    <p className="single-manga__descr">Chapters: {chapters}</p>
                    <div className="single-manga__price">{status}</div>
                </div>
            </div>
            <Link 
            style={{'display': 'block',  'textAlign' : 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '60px'}}
            to="/manga"
            >Back to manga list</Link>
        </>
    )
}


export default SingleMangaLayout;
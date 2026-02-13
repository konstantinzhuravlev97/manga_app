import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleAnimeLayout.scss';

const SingleAnimeLayout = ({data}) => {

    const {title, description, status, trailer, genres, year, thumbnail} = data;
    
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} anime`}
                    />
                <title>{title}</title>
            </Helmet>
            <div className="single-anime">
                <img src={thumbnail} alt={title} className="single-anime__img"/>
                <div className="single-anime__info">
                    <h2 className="single-anime__name">{title}</h2>
                    <iframe
                    
                        style={{'display': trailer.embed_url ? 'block' : 'none' ,'width': '600px', 'height': '400px'}} 
                        src={trailer.embed_url}
                        title="YouTube video player"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                    <p className="single-anime__descr">{genres}</p>
                    <p className="single-anime__descr">Year: {year}</p>
                    <p className="single-anime__descr">{description}</p>
                    <div className="single-anime__price">{status}</div>
                </div>
            </div>
            <Link 
                style={{'display': 'block',  'textAlign' : 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '60px'}}
                to="/"
                >Back to main page</Link>
        </>
    )
}

export default SingleAnimeLayout;
import './singlemanga.scss';
import cowboy from '../../resources/img/cowboy_bebop.jpg';

const SingleManga = () => {
    return (
        <div className="single-manga">
            <img src={cowboy} alt="cowboy_bebop" className="single-manga__img"/>
            <div className="single-manga__info">
                <h2 className="single-manga__name">Cowboy Bebop</h2>
                <p className="single-manga__descr">Spike, Jet, Faye and Ed—cowboys on the new frontier. Together this band of interplanetary bounty hunters takes on the jobs that anyone in their right mind would turn down.</p>
                <p className="single-manga__descr">Volumes: 3</p>
                <p className="single-manga__descr">Chapters: 11</p>
                <div className="single-manga__price">0.00 $</div>
            </div>
            <a href="#" className="single-manga__back">Back to all</a>
        </div>
    )
}

export default SingleManga;
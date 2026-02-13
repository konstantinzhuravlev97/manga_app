import banner from '../../resources/img/banner.jpg';

import './appBanner.scss';


const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={banner} alt="banner"/>
        </div>
    )
}

export default AppBanner;
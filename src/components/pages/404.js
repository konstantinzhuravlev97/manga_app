import { Link } from "react-router-dom";

import error from "../../resources/img/404.png";

const Page404 = () => {

    return (
        <div>
            <img src={error} alt="error" 
                style={{'display': 'block','margin': '0 auto', 'width': '600px'}}/>
            <Link 
                style={{'display': 'block', 'textAlign' : 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}
                to="/"
                >Back to main page</Link>
        </div>
    )
}

export default Page404;
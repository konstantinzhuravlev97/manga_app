import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import SingleManga from "../singleManga/SingleManga";

import MainPage from "../pages/MainPage";
import MangaPage from "../pages/MangaPage";


const App = () => {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Switch>
                    <Route exact path="/manga">
                        <MangaPage/>
                    </Route>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                </Switch>
                {/* <SingleManga/> */}
            </main>
        </div>
        </Router>
    )


}

export default App;
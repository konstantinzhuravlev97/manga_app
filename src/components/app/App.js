import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage'))
const MangaPage = lazy(() => import('../pages/MangaPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const SingleAnimeLayout = lazy(() => import('../pages/singleAnimeLayout/SingleAnimeLayout'))
const SingleMangaLayout = lazy(() => import('../pages/singleMangaLayout/SingleMangaLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'))
const Page404 = lazy(() => import('../pages/404'));

const App = () => {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/manga" element={<MangaPage/>}/>
                        <Route path="/anime/:id" element={<SinglePage Component={SingleAnimeLayout} dataType='anime'/>}/>
                        <Route path="/manga/:id" element={<SinglePage Component={SingleMangaLayout} dataType='manga'/>}/>
                        <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>  
                </Suspense>
            </main>
        </div>
        </Router>
    )


}

export default App;
import { Helmet } from "react-helmet";

import MangaList from "../mangaList/MangaList";
import AppBanner from "../appBanner/AppBanner";

const MangaPage = () => {

    return (
        <>
            <Helmet>
            <meta
                    name="description"
                    content="Page with list of manga"
                    />
                <title>Manga page</title>
            </Helmet>
            <AppBanner/>
            <MangaList/>
        </>
        
    )
}

export default MangaPage;
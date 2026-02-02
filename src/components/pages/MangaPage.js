import { useState } from "react";

import MangaList from "../mangaList/MangaList";

const MangaPage = () => {

    const [selectedManga, setSelectedManga] = useState(null);
    const [selectedAnime, setSelectedAnime] = useState(null);

    return (
        <MangaList/>
    )
}

export default MangaPage;
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useJikanService from "../../services/JikanService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getManga, getAnime, getCharacter, clearError} = useJikanService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'manga':
                getManga(id).then(onDataLoaded);
                break;
            case 'anime':
                getAnime(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !data) ? <Component data={data}/> : null;

    return(
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;
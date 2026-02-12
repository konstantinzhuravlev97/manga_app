import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useJikanService from '../../services/JikanService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import charSearchForm from './charSearchForm.scss';

const CharSearchForm = () => {

    const [charList, setCharList] = useState(null);
    const [number, setNumber] = useState(0);
    const {loading, error, getCharacterByName, clearError} = useJikanService();

    useEffect(() => {

    }, [number]);

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => newCharList);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharListLoaded)
    }


    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null;
    const results = !charList ? null : charList.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {charList[number].name} page?</div>
            <div className='char__buttons'>
                <Link to={`/characters/${charList[number].id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
                <button
                    className="button button__secondary"
                    onClick={() => number < charList.length - 1 ? setNumber(number => number + 1) : setNumber(0)}
                    >
                    <div className='inner'>Try again</div>
                </button>
            </div>
        </div> : 
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;
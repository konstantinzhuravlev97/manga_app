import spinner from '../../resources/img/spinner.gif'

const Spinner = () => {
    return (
        <img src={spinner} alt='loading' 
            style={{display: 'block', margin: '0 auto', width: '150px', height: '150px', background: 'none'}}/>
    )
}

export default Spinner;
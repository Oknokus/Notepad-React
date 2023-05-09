import PropTypes from 'prop-types';


import './AsideOut.scss';


const AsideOut = ({logOutUser}) => {
    return (
        <button 
                className='aside-container__out'
                onClick={logOutUser}>
                    Выйти
        </button>
    )
};

AsideOut.propTypes ={
    logOutUser:PropTypes.func 
};

export default AsideOut;
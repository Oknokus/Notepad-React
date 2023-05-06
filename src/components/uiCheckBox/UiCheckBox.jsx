// import PropTypes from 'prop-types';
// import { useContext } from 'react';
// import { CustumContext } from '../../hookHelper/Context';

// import checked from "../uiCheckBox/imageCheckBox/checked.png"
// import notChecked from "../uiCheckBox/imageCheckBox/notChecked.png"


// import './UiCheckBox.scss';


// const UiCheckBox = ({hendleComplete, id, isComplete}) => { 

//     const{setStateChecBox} = useContext(CustumContext); 

//       return (        
//         <div className='checkbox-container'>
//             <ul key={id}>                
//                 <li 
//                 onClick={() => {hendleComplete(id); setStateChecBox(prev => !prev)}}>
//                     {
//                     isComplete.map(elem => {
//                         elem === true ?
//                         <img className='checkbox-container__img' src={notChecked} alt="notChecked" />            
//                        :
//                        <img className='checkbox-container__img' src={checked} alt="checked" />
//                     }) 
//                     }
//                     </li>
//                 </ul>
           
//         </div>
//     )
// }

// UiCheckBox.ropTypes = {
//     isComplete:PropTypes.bool
// }

// export default UiCheckBox;
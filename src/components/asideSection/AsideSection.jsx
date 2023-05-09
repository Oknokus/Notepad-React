import {useContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {CustumContext} from '../../hookHelper/Context';

import AsideMenu from "./asideMenu";
import AsideCreateCategory from "./asideCreateCategory";
import AsideOut from "./asideOut";

import {dataColors} from "../../constants/dataColors";


import './AsideSection.scss';


const AsideSection = () => {  
    const {
        userState,
        setUserState,
        setCategoryState,
        setCategory,
        category
        } = useContext(CustumContext);
    

    const [active, setActive] = useState(false);
    const [color] = useState(dataColors[0]);
           
    const addCategoty = () => {         
    let newCategory = {
            categoryName: category,
            id: uuidv4(),
            color,
            tasks: []            
    };

        const stateCategory = JSON.parse(localStorage.getItem("user")) ;      
             
        const result = stateCategory.categories.find(elem => {
        return elem.categoryName === category
        });
   
        axios.patch(`http://localhost:8080/users/${userState.id}`, { 
            categories: [
                ...userState.categories,
                newCategory
            ]})  
        .then(({data}) => {           
            if(result || category.length > 15) {
                setCategoryState("Такая категория уже есть, или количество символов превышает 15 !!!");                 
                return; 

            } else {
                setCategoryState("")
            }
            
            setUserState({
                ...data,
                token: userState.token
            });

            localStorage.setItem("user", JSON.stringify({
                ...data,
                token: userState.token
            }));           
            setActive(false);
            setCategory("");
            toast("Категория добавлена!!!")
        }).catch(err => toast(`Категория не добавлена!!!, ${err.message}`))       
    };

    const subMit = (e) => {
        setCategory(e.target.value);
    };

    const logOutUser = () => {
        localStorage.removeItem("user");
        setUserState([])
    };

    const deleteCategory = (id) => {       
        let newArrayCategories = userState.categories.filter((elem) => 
        elem.id !== id);   
        
        axios.patch(`http://localhost:8080/users/${userState.id}`, {categories: newArrayCategories})
            .then(({data}) => {
                setUserState({
                    ...data,
                    token: useState.token
                }) 
                localStorage.setItem("user", JSON.stringify({
                    ...data,
                    token: useState.token
                }))  
                toast("Категория удалена!!!")
            })
            .catch(err => toast(`Категория не удалена!!!, ${err.message}`))
    };           
        
     return (
        <div className='aside-container'>
            <AsideOut logOutUser={logOutUser} />
            <AsideMenu deleteCategory={deleteCategory} />
            <AsideCreateCategory subMit={subMit} addCategoty={addCategoty} setActive={setActive} active={active} />                       
        </div>
    )
};

export default AsideSection;
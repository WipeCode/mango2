import React, { useState, useContext, useEffect } from "react";
/** Подключение стилей */
import css from "./css/BackBtn.module.css";
/** Подключение компонентов */
import { AppContext } from "../../../../context/Context.jsx";

export default function BackBtn() {
    const { IconName, GetIcon, pageTitle, pagesMath, history } = useContext( AppContext );
    const [ btn, setBtn ] = useState(null);

    const onClickLink = () => history.back();

    const getBtn = (location) => {
        return pagesMath && pagesMath !== location
        ? <div className={ css.back } onClick={ () => onClickLink() }>{ <GetIcon name={ IconName.arrow_left }/> }<p className={ css.title }>{ pageTitle }</p></div>
        : <div className={ css.back }><p className={ css.title }>{ pageTitle }</p></div>;
    }

    useEffect(
        () => {
            if (pageTitle) {
                const location = window.location.pathname;
                setBtn( getBtn(location) );
            }
        },
        [ pageTitle ]
    )
        
    return btn;
}
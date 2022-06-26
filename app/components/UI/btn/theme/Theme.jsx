import React, { useContext, useState, useEffect } from "react";
/** Подключение стилей */
import css from "./css/Theme.module.css";
/** Подключение компонентов */
import { AppContext } from "../../../../context/Context.jsx";

export default function Theme({ className=null }) {
    const { darkTheme, setDarkTheme, onChangeTheme } = useContext( AppContext );
    const [ content, setContent ] = useState(null);

    useEffect(
        () => {
            setContent(
                <select 
                    name="theme" 
                    id="theme" 
                    className={ [css.wrap, className].join(" ") }
                    defaultValue={ darkTheme ? "dark" : "light" }
                    onChange={ (e) => {
                        let flag = e.target.value==="dark";
                        setDarkTheme(flag);
                        onChangeTheme(flag);
                    } }
                >
                    <option value="dark">Dark theme</option>
                    <option value="light">Light theme</option>
                </select>
            );
        },
        [ content ]
    );


    return content;
}
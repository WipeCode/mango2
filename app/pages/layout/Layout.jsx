import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
/** Подключение стилей */
import css from "./css/Layout.module.css";
/** Подключение компонентов */
import { AppContext } from "../../context/Context.jsx";
import { getLocalStorage, setLocalStorage } from "../../api/localStorage.jsx";
import useElementWidth from "../../components/useElementWidth.jsx";
/** Подключение UI компонентов */
import TopNav from "../../components/UI/nav/TopNav.jsx";
import BottomNav from "../../components/UI/nav/BottomNav.jsx";

export default function Layout() {
    const { isDesktop, setIsDesktop, darkTheme, setDarkTheme } = useContext( AppContext );
    const [ ref, width ] = useElementWidth( setIsDesktop );

    useEffect(
        () => {
            if (darkTheme===null) {
                let theme = getLocalStorage(['theme'])[0] ?? window.matchMedia("(prefers-color-scheme: dark)").matches;
                
                if (theme===null || theme==="true" || theme===true) setDarkTheme(true);
                else setDarkTheme(false);
                // setDarkTheme(false);
            }
        },
        [ darkTheme ]
    );

    return (
        <div ref={ ref } className={ [css.wrap, darkTheme ? css.darkTheme : css.lightTheme].join(" ") }>
            <TopNav/>

            <article>
                <main>
                    <Outlet/>
                </main>
            </article>

            <BottomNav/>
        </div>
    );
}
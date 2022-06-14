import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
/** Подключение стилей */
import css from "./css/Nav.module.css";
/** Подключение компонентов */
import { getPathByBottomNav } from "../../../router/AppPathConst.jsx";
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";

export default function BottomNav() {
    const { localId, localIsAuth } = useContext(LocalUserContext);
    const { IconName, GetIcon, setPageTitle, setPagesMath, isDesktop } = useContext(AppContext);
    
    const [ thisDesktop, setThisDesktop ] = useState(null);
    const [ thisAuth, setThisAuth ] = useState(null);

    const [ path, setPath ] = useState(null);
    const [ navigation, setNavigation ] = useState(null);

    useEffect(
        () => {
            setThisAuth(localIsAuth);
            setThisDesktop(isDesktop);
        },
        []
    );

    useEffect(
        () => {
            if (isDesktop!==null && localIsAuth!==null) {
                if (isDesktop !== thisDesktop && localIsAuth !== thisAuth) {
                    setThisDesktop(isDesktop);
                    setThisAuth(localIsAuth);
                    
                    if (isDesktop===false) setPath( getPathByBottomNav( localId, IconName, GetIcon ) );
                    else setPath(null);
                } else if (isDesktop !== thisDesktop || localIsAuth !== thisAuth) {
                    if (isDesktop !== thisDesktop) setThisDesktop(isDesktop);
                    else setThisAuth(localIsAuth);
                    
                    if (isDesktop===false) setPath( getPathByBottomNav( localId, IconName, GetIcon ) );
                    else setPath(null);
                }
            }
        },
        [ localIsAuth, isDesktop ]
    );

    useEffect(
        () => {
            if (path!==null) {
                setNavigation(
                    <nav className={ css.wrap }>
                        <div className={ [css.nav, css.bottom].join(" ") }>
                            {
                                [
                                    path.news ?? null,
                                    path.discovery,
                                    path.editor ?? null,
                                    path.articles,
                                    path.account ?? path.singin
                                ].map((m,i) => {
                                    return m
                                    ? <NavLink 
                                        key={ `key-top-sub-${i}` } 
                                        to={ m.to } 
                                        title={ m.title } 
                                        onClick={ () => { setPageTitle( m.title ); setPagesMath(null); } }>{ m.icon }</NavLink> 
                                    : null;
                                })
                            }
                        </div>
                    </nav>
                );
            } else setNavigation(null);
        },
        [ thisDesktop, path ]
    );

    return navigation ? navigation : null;
}
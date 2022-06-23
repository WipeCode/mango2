import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
/** Подключение стилей */
import css from "./css/Nav.module.css";
/** Подключение компонентов */
import { getPathByTopNav } from "../../../router/AppPathConst.jsx";
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
/** Подключение UI компонентов */
import LogOutBtn from "../btn/logout/LogOutBtn.jsx";
import BackBtn from "../btn/back/BackBtn.jsx";

export default function TopNav() {
    const navigate = useNavigate();
    const { setLocalIsAuth, localIsAuth, setLocalId, localId } = useContext( LocalUserContext );
    const { isDesktop, IconName, GetIcon, setPagesMath, darkTheme, setDarkTheme, onChangeTheme } = useContext( AppContext );

    const [ thisDesktop, setThisDesktop ] = useState(null);
    const [ thisAuth, setThisAuth ] = useState(null);

    const [ path, setPath ] = useState(null);
    const [ navigation, setNavigation ] = useState(null);

    const onClickLink = (link) => {
        setPagesMath(null);
        navigate(link);
    }

    useEffect(
        () => {
            setThisAuth(localIsAuth);
            setThisDesktop(isDesktop);
            setPath( getPathByTopNav( isDesktop, localIsAuth, localId, IconName, GetIcon ) );
        },
        []
    );

    useEffect(
        () => {
            if (isDesktop!==null && localIsAuth!==null) {
                if (isDesktop !== thisDesktop && localIsAuth !== thisAuth) {
                    setThisDesktop(isDesktop);
                    setThisAuth(localIsAuth);
                    setPath( getPathByTopNav( isDesktop, localIsAuth, localId, IconName, GetIcon ) );
                } else if (isDesktop !== thisDesktop || localIsAuth !== thisAuth) {
                    if (isDesktop !== thisDesktop) setThisDesktop(isDesktop);
                    else setThisAuth(localIsAuth);
                    setPath( getPathByTopNav( isDesktop, localIsAuth, localId, IconName, GetIcon ) );
                }
            }
        },
        [ localIsAuth, isDesktop ]
    );

    useEffect(
        () => {
            if (path) {
                setNavigation(
                    <nav className={ css.wrap }>
                        {
                            thisDesktop 
                            ?   <Desktop 
                                    onClickLink={ onClickLink } 
                                    path={ path } 
                                    thisAuth={ thisAuth } 
                                    setLocalIsAuth={ setLocalIsAuth }
                                    localId={ localId }
                                    setLocalId={ setLocalId }
                                    IconName={ IconName } 
                                    GetIcon={ GetIcon }
                                    darkTheme={ darkTheme }
                                    setDarkTheme={ setDarkTheme }
                                    onChangeTheme={ onChangeTheme }
                                />
                            :   <Mobile 
                                    onClickLink={ onClickLink } 
                                    path={ path } 
                                />
                        }
                    </nav>
                );
            }
        },
        [ thisDesktop, path ]
    );

    if (navigation) {
        return navigation;
    }
}

function Desktop({ onClickLink, path, thisAuth, setLocalIsAuth, localId, setLocalId, IconName, GetIcon, darkTheme, setDarkTheme, onChangeTheme }) {
    return (
        <div className={ [css.nav, css.desktop].join(" ") }>
            <Link 
                key={ path.logo.key } 
                to={ path.logo.to } 
                className={ css.logo } 
                onClick={ () => onClickLink( path.logo.to ) }
            >{ path.logo.icon }</Link>

            <nav>
                {
                    [ path.news??null, path.articles, path.discovery, path.tools ].map((m, i) => {
                        return  m 
                                ?   <NavLink 
                                        key={ `key-top-${i}` } 
                                        to={ m.to } 
                                        title={ m.title } 
                                        onClick={ () => onClickLink( m.to ) }
                                    >{ m.title }</NavLink> 
                                : null;
                    })
                }
            </nav>

            <div className={ css.account }>
                <select 
                    name="theme" 
                    id="theme" 
                    className={ css.theme }
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

                <div className={ css.user }>
                    {
                        thisAuth
                        ?   <div className={ css.avatar }>
                                <img alt="avatar" src={ `https://api.ebene.ru/userImg?userId=${localId}` }/>
                            </div>
                        :   <NavLink 
                                key={ path.singin.key } 
                                to={ path.singin.to } 
                                title={ path.singin.title } 
                                className={ css.singin } 
                                onClick={ () => onClickLink(path.singin.to) }>{ path.singin.title }
                            </NavLink>
                    }

                    {
                        thisAuth &&
                        <div className={ css.sub }>
                            {
                                [ path.account, path.editor, path.settings ].map((m, i) => {
                                    return <NavLink 
                                                key={ `key-top-sub-${i}` } 
                                                to={ m.to } 
                                                title={ m.title } 
                                                className={ css.link }
                                                onClick={ () => onClickLink(m.to) }>
                                                    { m.icon }<i className={ css.title }>{ m.title }</i>
                                            </NavLink>;
                                })
                            }

                            <LogOutBtn 
                                IconName={ IconName } 
                                GetIcon={ GetIcon } 
                                setLocalIsAuth={ setLocalIsAuth }
                                setLocalId={ setLocalId }
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

function Mobile({ onClickLink, path }) {
    return (
        <div className={ [css.nav, css.mobile].join(" ") }>
            <BackBtn/>

            {
                [ path.tools ].map((m,i) => {
                    return m 
                    ? <NavLink 
                        key={ `key-top-sub-${i}` } 
                        to={ m.to } 
                        title={ m.title } 
                        onClick={ () => onClickLink(m.title) }>{ m.icon }</NavLink> 
                    : null;
                })
            }
        </div>
    );
}
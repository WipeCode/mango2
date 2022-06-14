import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
/** Подключение стилей */
import css from "./css/Tools.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import { getPathByTools } from "../../../router/AppPathConst.jsx";
import LogOutBtn from "../../../components/UI/btn/logout/LogOutBtn.jsx";

export default function Tools() {
    const [ content, setContent ] = useState(null);
    const [ path, setPath ] = useState(null);
    const { localIsAuth, setLocalIsAuth } = useContext(LocalUserContext);
    const { setPageTitle, changePagesMath, IconName, GetIcon, darkTheme, setDarkTheme, onChangeTheme } = useContext(AppContext);
    
    const location = window.location.pathname;

    useEffect(
        () => {
            setPageTitle("Tools");
            setPath( getPathByTools( localIsAuth, IconName, GetIcon ) );
        },
        [ localIsAuth ]
    );

    useEffect(
        () => {
            if (path) {
                setContent(
                    <div className={ [css.wrap, darkTheme?css.dark:css.light].join(" ") }>
                        <div className={ css.links }>
                            {
                                [ path.fqa, path.settings ?? null ].map((m,i) => {
                                    return m ? <Link key={i} to={ m.to } title={ m.title } onClick={ () => changePagesMath(location) }>{ m.icon }{ m.title }</Link> : null;
                                })
                            }
                        </div>

                        <div className={ css.extra }>
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
                        </div>
        
                        { localIsAuth && <LogOutBtn IconName={ IconName } GetIcon={ GetIcon } setLocalIsAuth={ setLocalIsAuth }/> }
                    </div>  
                );
            }
        },
        [ path, darkTheme ]
    );

    return content;
}
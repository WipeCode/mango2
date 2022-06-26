import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
/** Подключение стилей */
import css from "./css/Tools.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import { getPathByTools } from "../../../router/AppPathConst.jsx";
import LogOutBtn from "../../../components/UI/btn/logout/LogOutBtn.jsx";
import Theme from "../../../components/UI/btn/theme/Theme.jsx";

export default function Tools() {
    const [ content, setContent ] = useState(null);
    const [ path, setPath ] = useState(null);
    const { localIsAuth, setLocalIsAuth, setLocalId } = useContext(LocalUserContext);
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
                            <Theme className={ css.theme }/>
                        </div>
        
                        { 
                            localIsAuth && 
                            <LogOutBtn 
                                IconName={ IconName } 
                                GetIcon={ GetIcon } 
                                setLocalIsAuth={ setLocalIsAuth }
                                setLocalId={ setLocalId }
                            /> 
                        }
                    </div>  
                );
            }
        },
        [ path, darkTheme ]
    );

    return content;
}
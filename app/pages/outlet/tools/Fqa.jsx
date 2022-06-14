import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
/** Подключение стилей */
import css from "./css/Fqa.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import { getPathByFqa } from "../../../router/AppPathConst.jsx";

export default function Fqa() {
    const { setPageTitle, IconName, GetIcon, darkTheme } = useContext(AppContext);
    const { localIsAuth } = useContext(LocalUserContext);
    
    const [ content, setContent ] = useState(true);
    const [ path, setPath ] = useState(true);
    const navigate = useNavigate();

    useEffect(
        () => {
            setPageTitle("FAQs");
            if (window.location.pathname === "/tools/fqa") navigate("/tools/fqa/general");
        },
        []
    );

    useEffect(
        () => {
            setPath( getPathByFqa(localIsAuth) );
        },
        [ localIsAuth ]
    );

    useEffect(
        () => {
            setContent(
                <div className={ [css.wrap,darkTheme?css.dark:css.light].join(" ") }>
                    <h1 className={ css.header }>Frequently Asked Questions</h1>
                    <div className={ css.content }>
                        <div className={ css.links }>
                            {
                                [ path.general, path.settings ?? null, path.editor ?? null ].map((m,i) => {
                                    return m ? <NavLink key={i} to={ m.to } title={ m.title }>{ m.title }</NavLink> : null;
                                })
                            }
                        </div>

                        <div className={ css.accordion }>
                            <Outlet/>
                        </div>

                        <div className={ css.networks }>
                            <a href="https://github.com/WipeCode/re-mango" title="github">{ <GetIcon name={ IconName.github }/> }</a>
                            <a href="https://vk.com/olexaakker" title="vk">{ <GetIcon name={ IconName.vk }/> }</a>
                            <a href="https://www.youtube.com/" title="youtube">{ <GetIcon name={ IconName.youtube }/> }</a>
                        </div>
                    </div>
                </div>
            );
        },
        [ path, darkTheme ]
    );

    return content;
}
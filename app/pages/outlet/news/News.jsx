import React, { useContext, useEffect, useState } from "react";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/News.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
/** Подключение компонентов */
import { getNewsByUserId } from "../../../api/aPost.jsx";
import ArticleCardsWrap from "../../../components/UI/card/article/mini/ArticleCardsWrap.jsx";

export default function News() {
    const { localId, localRole } = useContext(LocalUserContext);
    const { setPageTitle, changePagesMath, IconName, GetIcon, darkTheme } = useContext(AppContext);

    const [ posts, setPosts ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ loader, setLoader ] = useState(true);
    const [ location, setLocation ] = useState(window.location.pathname);

    const callback = () => {
        setLoader(true);
        getNewsByUserId(localId, setPosts, setLoader);
    }

    useEffect(
        () => {
            setLocation(window.location.pathname);
        },
        [ window.location.pathname ]
    );

    useEffect(
        () => {
            setPageTitle("News");
            getNewsByUserId(localId, setPosts, setLoader);
        },
        [ location ]
    );
        
    useEffect(
        () => {
            if (!loader) {
                if (posts) {
                    setContent(
                        <div className={ css.wrap }>
                            <ArticleCardsWrap
                                darkTheme={ darkTheme }
                                articles={ posts }
                                location={ location }
                                localId={ localId }
                                localRole={ localRole }
                                changePagesMath={ changePagesMath }
                                IconName={ IconName }
                                GetIcon={ GetIcon }
                                callback={ callback }
                            />
                        </div>
                    );
                } else {
                    setContent(
                        <div className={ noDataStyle.wrap }>
                            <div className={ noDataStyle.content }>
                                <h1>News</h1>
                                <p>No data available</p>
                            </div>
                        </div>
                    );
                }
            } else {
                setContent(
                    <div className={ noDataStyle.loader }>
                        <main></main>
                    </div>
                );
            }
        },
        [ posts, loader, darkTheme ]
    );

    return content;
}
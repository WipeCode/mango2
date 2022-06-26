import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/Article.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
/** Подключение компонентов */
import { getNewArticles } from "../../../api/aPost.jsx";
import ArticleCardsWrap from "../../../components/UI/card/article/mini/ArticleCardsWrap.jsx";

export default function Articles() {
    const { localId, localRole } = useContext(LocalUserContext);
    const { setPageTitle, changePagesMath, IconName, GetIcon, darkTheme } = useContext(AppContext);
    
    const [ content, setContent ] = useState(true);
    const [ loader, setLoader ] = useState(true);
    const [ newArticles, setNewArticles ] = useState(null);
    const location = window.location.pathname;

    const callback = () => {
        setLoader(true);
        getNewArticles(localId, setNewArticles, setLoader);
    }

    useEffect(
        () => {
            setPageTitle("Articles");
            getNewArticles(localId, setNewArticles, setLoader);
        },
        [ localId ]
    );

    useEffect(
        () => {
            if (!loader) {
                if (newArticles) {
                    setContent(
                        <div className={ [css.wrap, darkTheme ? css.dark : css.light].join(" ") }>
                            <h1 className={ css.header }>New articles</h1>
                            <ArticleCardsWrap
                                darkTheme={ darkTheme }
                                articles={ newArticles }
                                location={ location }
                                localId={ localId }
                                localRole={ localRole }
                                changePagesMath={ changePagesMath }
                                IconName={ IconName }
                                GetIcon={ GetIcon }
                                className={ css.articles }
                                classContainer={ css.container }
                                callback={ callback }
                            />
                            <p className={ css.description }>See more articles you might like</p>
                            <Link to="/discovery" className={ css.discovery } title="discovery">Discovery</Link>
                        </div>
                    );
                } else {
                    setContent(
                        <div className={ noDataStyle.wrap }>
                            <div className={ noDataStyle.content }>
                                <h1>Articles</h1>
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
        [ newArticles, darkTheme ]
    );

    return content;
}
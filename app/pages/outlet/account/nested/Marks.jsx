import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/** Подключение стилей */
import noDataStyle from "../../style/css/NoData.module.css";
import css from "../css/AccountNested.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../../context/Context.jsx";
import ArticleCardsWrap from "../../../../components/UI/card/article/mini/ArticleCardsWrap.jsx";
/** Подключение API  */
import { getMarksById } from "../../../../api/aPost.jsx";

export default function Marks() {
    const { id } = useParams();
    const [ location, setLocation ] = useState(window.location.pathname);

    const { localId, localRole } = useContext(LocalUserContext);
    const { changePagesMath, IconName, GetIcon, darkTheme } = useContext(AppContext);
    
    const [ post, setPost ] = useState(null);
    const [ content, setContent ] = useState(true);
    const [ loader, setLoader ] = useState(true);

    const callback = () => {
        setLoader(true);
        getMarksById(id, localId, setPost, setLoader);
    }

    useEffect(
        () => {
            setLocation(window.location.pathname);
        },
        [ window.location.pathname ]
    );

    useEffect(
        () => {
            if (id!==null) {
                getMarksById(id, localId, setPost, setLoader);
            }
        },
        [ location, id, localId ]
    );

    useEffect(
        () => {
            if (!loader) {
                if (post) {
                    setContent(
                        <div className={ css.wrap }>
                            <ArticleCardsWrap
                                darkTheme={ darkTheme }
                                articles={ post }
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
                                <h1>Marks</h1>
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
        [loader, darkTheme]
    )

    return content;
}
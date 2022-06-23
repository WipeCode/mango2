import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/** Подключение стилей */
import css from "./css/ArticleMiniCard.module.css";
/** Подключение компонентов */
import ArticleSetup from "../../../btn/article_setup/ArticleSetup.jsx";

export default function ArticleMiniCard({ darkTheme, localId, localRole, articleId, date, score, people, name, ismark, isDraft=false, creatorName, creatorId, IconName, GetIcon, changePagesMath, location }) {
    const navigate = useNavigate();
    const [ content, setContent ] = useState(null);

    const onClick = () => {
        changePagesMath(location);
        navigate(`/articles/${articleId}`);
    }

    useEffect(
        () => {
            if (darkTheme!==null) {
                setContent(
                    <div className={ [css.wrap, darkTheme ? css.dark : css.light].join(" ") }>
                        <div className={ css.img }>
                            <ArticleSetup
                                darkTheme={ darkTheme }
                                localId={ localId }
                                localRole={ localRole }
                                creatorId={ creatorId }
                                isDraft={ isDraft }
                                localIsMark={ ismark }
                                articleId={ articleId }
                                IconName={ IconName }
                                GetIcon={ GetIcon }
                            />

                            <img src={ `https://api.ebene.ru/articleImg?articleId=${articleId}` } alt={ name } onClick={ () => onClick() }/>

                            <div className={ css.score }>
                                <span className={ css.num }>{ score }</span>
                                <span className={ css.star }>{ <GetIcon name={ IconName.isstar }/> }</span>
                                <span className={ css.people }>({ people })</span>
                            </div>
                        </div>

                        <div className={ css.info } onClick={ () => onClick() }>
                            <p className={ css.date }>{ date }</p>
                            <p className={ css.title }>{ name }</p>
                            <p className={ css.user }>{ creatorName }</p>
                        </div>
                    </div>
                );
            }
        },
        [ darkTheme, localId, localRole ]
    );

    return content ? content : null;
}
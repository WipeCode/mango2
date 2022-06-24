import React, { useState, useEffect } from "react";
/** Подключение стилей */
import css from "./css/ArticleCardsWrap.module.css";
/** Подключение компонентов */
import ArticleMiniCard from "./ArticleMiniCard.jsx";

export default function ArticleCardsWrap({ darkTheme, articles, location, localId, localRole, changePagesMath, IconName, GetIcon, className=null, classContainer=null, callback=null }) {
    const [ content, setContent ] = useState(null);
    
    useEffect(
        () => {
            setContent(
                <div className={ [ css.wrap, className ].join(" ") }>
                    <div className={ [css.gridrow, classContainer].join(" ") }>
                        {
                            articles.map((m,i) => {
                                return (
                                    <div className={ css.article } key={i}>
                                        <ArticleMiniCard
                                            darkTheme={ darkTheme }
                                            localId={ localId }
                                            localRole={ localRole }
                                            articleId={ m.id }
                                            date={ m.date }
                                            score={ m.score }
                                            people={ m.people }
                                            name={ m.name }
                                            ismark={ m.ismark }
                                            isDraft={ m.isdraft }
                                            creatorName={ m.user.name }
                                            creatorId={ m.user.id }
                                            IconName={ IconName }
                                            GetIcon={ GetIcon }
                                            changePagesMath={ changePagesMath }
                                            location={ location }
                                            callback={ callback }
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        },
        [ articles, darkTheme ]
    );
    
    return content;
}
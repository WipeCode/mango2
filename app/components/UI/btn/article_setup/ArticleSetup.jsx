import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/** Подключение стилей */
import css from "./css/ArticleSetup.module.css";
/** Подключение API  */
import { deleteArticleById, setIsMark, setStatusArticle } from "../../../../api/aPost.jsx";
import { isAdmin } from "../../../../api/aUser.jsx";

export default function ArticleSetup({ darkTheme, localId, localRole, creatorId, isDraft, localIsMark, articleId, IconName, GetIcon, className=null }) {
    const navigate = useNavigate();
    const [ mark, setMark ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ isCreator, setIsCreator ] = useState(null);
    const [ thisIsAdmin, setIsAdmin ] = useState(null);

    const onPublish = () => {
        setStatusArticle(navigate, articleId, (!isDraft));
    };

    const onDelete = () => {
        deleteArticleById(localId, articleId);
    };

    const onMark = () => {
        let m = !mark;
        setIsMark(localId, articleId, m);
        setMark(m);
    }

    useEffect(
        () => {
            setMark(localIsMark);
            setIsAdmin(isAdmin(localRole));
            setIsCreator(localId === creatorId);
        },
        [ localId, localRole ]
    );

    useEffect(
        () => {
            setContent(
                <div className={ [css.wrap, darkTheme?css.dark:css.light, className].join(" ") }>
                    <div className={ css.container }>
                        <div className={ [css.mark,mark ? css.ismark : css.nomark].join(" ") } onClick={ () => onMark() }>
                            <GetIcon name={ mark ? IconName.ismark2 : IconName.mark2 }/>
                        </div>
                        {
                            (isCreator || thisIsAdmin) &&
                            <div className={ css.setup }>
                                <div className={ css.button }>
                                    <GetIcon name={ IconName.setup }/>
                                </div>
                                <ul>
                                    <li onClick={ () => onPublish() }>{ isDraft ? "Publish" : "Unpublish" }</li>
                                    { isCreator && <li><Link to={ `/editor/${articleId}` } title="edit">Edit</Link></li> }
                                    <li onClick={ () => onDelete() }>Delete</li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            );
        },
        [ isCreator, thisIsAdmin, mark, darkTheme ]
    );

    return content;
}
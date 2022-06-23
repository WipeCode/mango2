import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/** Подключение стилей */
import css from "./css/ArticleSetup.module.css";
/** Подключение API  */
import { deleteArticleById, setIsMark, setStatusArticle } from "../../../../api/aPost.jsx";
import { isAdmin } from "../../../../api/aUser.jsx";

export default function ArticleSetup({ darkTheme, localId, localRole, creatorId, isDraft, idMark, articleId, IconName, GetIcon, className=null }) {
    const navigate = useNavigate();

    const [ mark, setMark ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ isCreator, setIsCreator ] = useState(null);
    const [ thisIsAdmin, setThisIsAdmin ] = useState(null);
    const [ accessSetup, setAccessSetup ] = useState(null);
    const [ thisIsPublic, setThisIsPublic ] = useState(null);
    
    const [ loaderPublic, setLoaderPublic ] = useState(false);
    const [ loaderDelete, setLoaderDelete ] = useState(false);

    const onPublish = () => {
        setLoaderPublic(true);
        setStatusArticle(articleId, thisIsPublic, setThisIsPublic, setLoaderPublic);
    };

    const onDelete = () => {
        setLoaderDelete(true);
        deleteArticleById(navigate, articleId, localId, setLoaderDelete);
    };

    const onMark = () => {
        setIsMark(localId, articleId, mark??null, setMark);
    }

    useEffect(
        () => {
            setMark(idMark);
            setThisIsPublic(!isDraft);
            setThisIsAdmin(isAdmin(localRole));
            setIsCreator(+localId === +creatorId);
        },
        [ idMark, localId, localRole ]
    );

    useEffect(
        () => {
            setAccessSetup(thisIsAdmin || isCreator);
        },
        [ thisIsAdmin, isCreator ]
    );

    useEffect(
        () => {
            if (localId) {
                setContent(
                    <div className={ [css.wrap, darkTheme?css.dark:css.light, className].join(" ") }>
                        <div className={ css.container }>
                            <div className={ [css.mark, mark?css.ismark:css.nomark].join(" ") } onClick={ () => onMark() }>
                                <GetIcon name={ mark ? IconName.ismark2 : IconName.mark2 }/>
                            </div>
                            {
                                accessSetup &&
                                <div className={ css.setup }>
                                    <div className={ css.button }>
                                        <GetIcon name={ IconName.setup }/>
                                    </div>
                                    <ul>
                                        <li>
                                            {(loaderPublic===false && loaderDelete===false) && <button onClick={ () => onPublish() }>{ thisIsPublic ? "Publish" : "Unpublish" }</button>}
                                            {loaderDelete===true && <button disabled>{ thisIsPublic ? "Publish" : "Unpublish" }</button>}
                                            {loaderPublic===true && <button className={ css.loader } disabled>{ thisIsPublic ? "Publish" : "Unpublish" }</button>}
                                        </li>

                                        {
                                            isCreator &&
                                            <li>
                                                <Link 
                                                    title="edit"
                                                    to={ `/editor/${articleId}` }
                                                    className={ (loaderPublic===true || loaderDelete===true) ? css.disabled : null }
                                                >
                                                    Edit
                                                </Link>
                                            </li>
                                        }

                                        <li>
                                            {(loaderPublic===false && loaderDelete===false) && <button onClick={ () => onDelete() }>Delete</button>}
                                            {loaderPublic===true && <button disabled>Delete</button>}
                                            {loaderDelete===true && <button className={ css.loader } disabled>Delete</button>}
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                );
            } else setContent(null);
        },
        [ thisIsPublic, loaderPublic, loaderDelete, accessSetup, mark, darkTheme ]
    );

    return content;
}
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
/** Подключение стилей */
import css from "./css/UserLineCard.module.css";
/** Подключение компонентов */
import FollowBtn from "../../btn/follow/FollowBtn.jsx";

export default function UserLineCard({ darkTheme, location, localid, id, src, name, isfollow, changePagesMath, className=null }) {
    const [ content, setContent ] = useState(true);

    useEffect(
        () => {
            if (id!==null && darkTheme!==null) {
                setContent(
                    <div className={ [css.wrap, className, darkTheme ? css.dark : css.light].join(" ") }>
                        <div className={ css.container }>
                            <Link 
                                to={ `/people/${id}/posts` } 
                                title={ name }
                                onClick={ () => changePagesMath(location) }
                            >
                                <div className={ css.avatar }>
                                    <img src={ src??"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU" } alt="creator_avatar"/>
                                </div>
                
                                <p className={ css.name }>{ name }</p>
                            </Link>
                
                            {
                                (+localid !== +id) &&
                                <FollowBtn
                                    localId={ localid }
                                    selectedId={ id }
                                    isfollow={ isfollow }
                                    className={ css.button }
                                />
                            }
                        </div>
                    </div>
                );
            }
        },
        [ id, darkTheme ]
    );

    return content;
}
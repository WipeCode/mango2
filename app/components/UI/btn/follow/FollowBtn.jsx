import React, { useState, useEffect } from "react";
/** Подключение стилей */
import css from "./css/FollowBtn.module.css";
import noDataStyle from "../../../../pages/outlet/style/css/NoData.module.css";
/** Подключение API  */
import { setFollow } from "../../../../api/aUser.jsx";

export default function FollowBtn({ localId, selectedId, isfollow, className=null }) {
    const [ thisIsFollow, setThisIsFollow ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ loader, setLoader ] = useState(false);

    useEffect(
        () => {
            setThisIsFollow( isfollow );
        },
        [ isfollow ]
    );

    useEffect(
        () => {
            if (localId && +localId !== +selectedId) {
                setContent(
                    <button 
                        onClick={ () => changeFollow() }
                        className={ [thisIsFollow ? css.isfollow : css.notfollow, className].join(" ") }
                    >
                        {
                            loader===false
                            ? (thisIsFollow === false ? "Follow" : "Following")
                            :   <div className={ noDataStyle.button_loader }>
                                    <i></i><i></i><i></i>
                                </div>
                        }
                    </button>
                );
            } else setContent(null);
        },
        [ loader, thisIsFollow, localId ]
    );

    function changeFollow() {
        let f = !thisIsFollow;
        setLoader(true);
        setFollow(localId, selectedId, f, setThisIsFollow, setLoader);
    }

    return content;
}
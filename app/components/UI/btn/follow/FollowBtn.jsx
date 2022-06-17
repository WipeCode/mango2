import React, { useState, useEffect } from "react";
/** Подключение стилей */
import css from "./css/FollowBtn.module.css";
/** Подключение API  */
import { setFollow } from "../../../../api/aUser.jsx";

export default function FollowBtn({ localId, selectedId, isfollow, className=null }) {
    const [ thisIsFollow, setThisIsFollow ] = useState(null);
    const [ content, setContent ] = useState(null);

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
                        { thisIsFollow === false ? "Follow" : "Following" }
                    </button>
                );
            } else setContent(null);
        },
        [ thisIsFollow, localId ]
    );

    function changeFollow() {
        let f = !thisIsFollow;
        setFollow(localId, selectedId, f, setThisIsFollow);
    }

    return content;
}
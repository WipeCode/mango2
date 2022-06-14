import React, { useState, useEffect } from "react";
/** Подключение стилей */
import css from "./css/FollowBtn.module.css";
/** Подключение API  */
import { setFollow } from "../../../../api/aUser.jsx";

export default function FollowBtn({ localId, selectedId, isfollow, className=null }) {
    const [ isFollow, setIsFollow ] = useState(null);

    useEffect(
        () => {
            setIsFollow( isfollow );
        },
        [ isfollow ]
    ); 

    function changeFollow() {
        let f = !isFollow;
        setFollow(localId, selectedId, f, setIsFollow);
        // setIsFollow(f);
    }

    if (+localId !== +selectedId) {
        return (
            <button 
                onClick={ () => changeFollow() }
                className={ [isFollow ? css.isfollow : css.notfollow, className].join(" ") }
            >
                { isFollow === false ? "Follow" : "Following"}
            </button>
        );
    }
}
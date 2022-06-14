import React from "react";
import { useNavigate } from "react-router-dom";
/** Подключение стилей */
import css from "./css/LogOutBtn.module.css";
/** Подключение компонентов */
import { logOut } from "../../../../api/aUser.jsx";

export default function LogOutBtn({IconName, GetIcon, setLocalIsAuth}) {
    const navigate = useNavigate();

    const onLogOut = () => {
        if (logOut()) {
            setLocalIsAuth(false);
            navigate("../articles", { replace: true });
        }
    }

    if (IconName) {
        return (
            <button onClick={ () => onLogOut() } className={ css.wrap }>
                { <GetIcon name={ IconName.logout }/> }
                Log out
            </button>
        );
    }
}
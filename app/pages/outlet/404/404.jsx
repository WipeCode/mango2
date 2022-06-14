import React, { useContext, useEffect } from "react";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
/** Подключение компонентов */
import { AppContext } from "../../../context/Context.jsx";

export default function Articles() {
    const { setPageTitle  } = useContext(AppContext);

    useEffect(
        () => {
            setPageTitle("Error");
        },
        []
    );

    return (
        <div className={ noDataStyle.wrap }>
            <div className={ noDataStyle.content }>
                <h1>404</h1>
                <p>The page was not found</p>
            </div>
        </div>
    );
}
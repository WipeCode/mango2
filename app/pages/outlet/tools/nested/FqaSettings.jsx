import React, { useContext } from "react";
/** Подключение стилей */
import noDataStyle from "../../style/css/NoData.module.css";
/** Подключение компонентов */
import { AppContext } from "../../../../context/Context.jsx";
import { fqaConst, GetFqas } from "./FqaConst.jsx";


export default function Settings() {
    const questions = fqaConst.settings ?? null;
    const { IconName, GetIcon } = useContext(AppContext);

    if (questions) {
        return  <GetFqas 
                    fqaConst={ questions }
                    IconName={ IconName } 
                    GetIcon={ GetIcon }
                />
    }

    return (
        <div className={ noDataStyle.wrap }>
            <div className={ noDataStyle.content }>
                <h1>Settings</h1>
                <p>No data available</p>
            </div>
        </div>
    );
}
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/** Подключение стилей */
import noDataStyle from "../../style/css/NoData.module.css";
import css from "../css/AccountNested.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../../context/Context.jsx";
import UserLineCard from "../../../../components/UI/card/user/UserLineCard.jsx";
/** Подключение API  */
import { getUserFollowersById } from "../../../../api/aUser.jsx";

export default function Followers() {
    const { id } = useParams();
    const location = window.location.pathname;
    
    const { localId } = useContext(LocalUserContext);
    const { changePagesMath, setPageTitle, darkTheme } = useContext(AppContext);
    
    const [ users, setUsers ] = useState(null);
    const [ loader, setLoader ] = useState(true);
    const [ content, setContent ] = useState(null);

    useEffect(
        () => {
            if (+id) {
                setPageTitle("Followers");
                getUserFollowersById(id, localId, setUsers, setLoader);
            }
        },
        [ localId ]
    );

    useEffect(
        () => {
            if (!loader) {
                if (users) {
                    setContent(
                        <div className={ [css.wrap, css.padding].join(" ") }>
                            {
                                users.map((m,i) => {
                                    return (
                                        <div className={ css.person } key={i}>
                                            <UserLineCard
                                                darkTheme={ darkTheme }
                                                location={ location } 
                                                localid={ localId } 
                                                id={ m.id } 
                                                name={ m.name } 
                                                isfollow={ m.isfollow }
                                                changePagesMath={ changePagesMath }
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                } else {
                    setContent(
                        <div className={ noDataStyle.wrap }>
                            <div className={ noDataStyle.content }>
                                <h1>Followers</h1>
                                <p>No data available</p>
                            </div>
                        </div>
                    );
                }
            } else {
                setContent(
                    <div className={ noDataStyle.loader }>
                        <main></main>
                    </div>
                );
            }
        },
        [loader, darkTheme]
    )

    return content;
}
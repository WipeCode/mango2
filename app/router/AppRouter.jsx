import React, { useState, useEffect} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../context/Context.jsx";
import UserRouter from "./UserRouter.jsx";
import { IconName, GetIcon } from "../components/getIcon.jsx";
import { getLocalStorage, setLocalStorage } from "../api/localStorage.jsx";

export default function AppRouter() {
    const default_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU";
    const history = createBrowserHistory();

    /** Id локального пользователя */
    const [ localId, setLocalId ] = useState(null);
    /** Роль локального пользователя */
    const [ localRole, setLocalRole ] = useState(null);
    /** Name локального пользователя */
    const [ localName, setLocalName ] = useState(null);
    /** Email локального пользователя */
    const [ localEmail, setLocalEmail ] = useState(null);
    /** Описание локального пользователя */
    const [ localDescription, setLocalDescription ] = useState(null);
    /** Является ли локального пользователь авторизованным */
    const [ localIsAuth, setLocalIsAuth ] = useState(null); 

    /** Наименование открытой страницы */
    const [ pageTitle, setPageTitle ] = useState(null);
    /** Является ли ширина основного компонента компьютерной версией */
    const [ isDesktop, setIsDesktop ] = useState(null);
    /** Вложенность URL */
    const [ pagesMath, setPagesMath ] = useState(null);
    /** Тема сайта */
    const [ darkTheme, setDarkTheme ] = useState(null);

    const changePagesMath = (location) => {
        if (!pagesMath) {
            setPagesMath(location);
        }
    }

    const onChangeTheme = (flag) => {
        setLocalStorage({ theme:flag });
    }

    useEffect(
        () => {

            let ls = getLocalStorage(["id", "name", "email", "description", "role"]);

            if (ls && ls[0]) {
                setLocalIsAuth(true);
                setLocalId(+ls[0]);
                setLocalName(ls[1]);
                setLocalEmail(ls[2]);
                setLocalDescription(ls[3]);
                setLocalRole(+ls[4]);
            } else {
                setLocalIsAuth(false);
                setLocalId(null);
                setLocalName(null);
                setLocalEmail(null);
                setLocalRole(null);
            }
        },
        [ localIsAuth ]
    );

    return (
        <AppContext.Provider value={{
            history,
            IconName, GetIcon,
            pageTitle, setPageTitle,
            isDesktop, setIsDesktop,
            darkTheme, setDarkTheme, onChangeTheme,
            pagesMath, setPagesMath, changePagesMath,
        }}>
            <LocalUserContext.Provider value={{
                localId, setLocalId,
                localRole, setLocalRole,
                localName, setLocalName,
                localEmail, setLocalEmail,
                localDescription, setLocalDescription,
                localIsAuth, setLocalIsAuth,
            }}>
                <Router history={ history }>
                    <UserRouter isDesktop={ isDesktop } localId={ localId }/>
                </Router>
            </LocalUserContext.Provider>
        </AppContext.Provider>
    );
}
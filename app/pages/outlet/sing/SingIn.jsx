import React, { useContext, useEffect } from "react";
/** Подключение компонентов */
import { AppContext } from "../../../context/Context.jsx";
import { Sing, getPath } from "./Sing.jsx";

export default function SingIn() {
    const path = getPath("/singup", "Sing Up", "Hello, Friend!", "Enter your personal details and start journey with us");
    const { setPageTitle } = useContext(AppContext);

    useEffect(
        () => {
            setPageTitle("Sing in");
        },
        []
    );

    return ( 
        <Sing
            path={ path }
            title="Sing In"
            description="use your account"
            isSingIn={ true }
        />
    );
}
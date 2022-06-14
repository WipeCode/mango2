import React, { useContext, useEffect } from "react";
/** Подключение компонентов */
import { AppContext } from "../../../context/Context.jsx";
import { Sing, getPath } from "./Sing.jsx";

export default function SingUp() {
    const path = getPath("/singin", "Sing in", "Welcome Back!", "To keep connected with us please login with your personal info");
    const { setPageTitle } = useContext(AppContext);

    useEffect(
        () => {
            setPageTitle("Sing Up");
        },
        []
    );

    return ( 
        <Sing
            path={ path }
            title="Sing Up"
            description="use your email for registration"
            isSingIn={ false }
        />
    );
}
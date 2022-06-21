import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/Sing.module.css";
/** Подключение компоненты */
import { LocalUserContext, AppContext } from "../../../context/Context.jsx";
import { setLocalStorage } from "../../../api/localStorage.jsx";
/** Подключение API */
import { singIn, singUp } from "../../../api/aUser.jsx";

export function Sing({ path, title, description, isSingIn }) {
    const navigate = useNavigate();
    const { darkTheme } = useContext(AppContext);
    const { setLocalId, setLocalRole, setLocalAvatar, setLocalName, setLocalEmail, setLocalIsAuth, setLocalDescription } = useContext(LocalUserContext);

    const [ thisLocalId, setThisLocalId ] = useState(null);
    const [ thisLocalRole, setThisLocalRole ] = useState(null);
    const [ thisLocalName, setThisLocalName ] = useState(null);
    const [ thisLocalEmail, setThisLocalEmail ] = useState(null);
    const [ thisLocalAvatar, setThisLocalAvatar ] = useState(null);
    const [ thisLocalDescription, setThisLocalDescription ] = useState(null);

    const [ content, setContent ] = useState(null);
    const [ loader, setLoader ] = useState(false);

    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ count, setCount ] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        setLoader(true);

        if (isSingIn && email && password) {
            singIn(
                email, 
                password,
                setLoader,
                setThisLocalId, 
                setThisLocalRole, 
                setThisLocalName, 
                setThisLocalEmail, 
                setThisLocalAvatar, 
                setThisLocalDescription
            );
        } else if (!isSingIn && name && email && password) {
            singUp(
                name,
                email,
                password,
                setLoader,
                navigate
            );
        }
    }
    
    const changePassword = (value) => {
        setPassword(value);
        setCount(value.length);
    }

    useEffect(
        () => {
            if (thisLocalId &&
                thisLocalRole &&
                thisLocalName &&
                thisLocalEmail &&
                thisLocalAvatar) 
            {
                setLocalIsAuth(true);
                setLocalId(thisLocalId);
                setLocalRole(thisLocalRole);
                setLocalName(thisLocalName);
                setLocalEmail(thisLocalEmail);
                setLocalAvatar(thisLocalAvatar);
                setLocalDescription(thisLocalDescription);

                navigate("../news");
            }
        },
        [ thisLocalId, thisLocalRole, thisLocalName, thisLocalEmail, thisLocalAvatar ]
    );

    useEffect(
        () => {
            if (path) {
                setContent(
                    <div className={ [css.wrap,darkTheme?css.dark:css.light].join(" ") }>
                        <div className={ [css.container, isSingIn ? css.singin : null].join(" ") }>
                            <div className={ css.sing }>
                                <h1>{ path.header }</h1>
                                <p>{ path.description }</p>
                                <Link to={ path.to } title={ path.title } className={ css.ghost }>{ path.title }</Link>
                            </div>
            
                            <div className={ css.form }>
                                <h1>{ title }</h1>
                                <span>{ description }</span>

                                <form onSubmit={ (e) => submit(e) }>
                                    <div className={ css.input }>
                                        { 
                                            !isSingIn && 
                                            <input 
                                                id="name" 
                                                type="text" 
                                                placeholder="Name" 
                                                onChange={ (e) => setName(e.target.value) } 
                                                required
                                            /> 
                                        }
                                        
                                        <input 
                                            id="email" 
                                            type="email" 
                                            placeholder="Email"
                                            autoComplete="email"
                                            onChange={ (e) => setEmail(e.target.value) } 
                                            required
                                        />
                                        
                                        <label className={ css.pasword } htmlFor="password">
                                            <input 
                                                id="password" 
                                                type="password" 
                                                placeholder="Password" 
                                                autoComplete={ isSingIn ? "current-password" : "new-password" }
                                                minLength={isSingIn ? 1 : 6} 
                                                maxLength={255} 
                                                onChange={ (e) => changePassword(e.target.value) } 
                                                required
                                            />
                                            
                                            { !isSingIn && <span>Minimum 6 characters<i>{count}/255</i></span>}
                                        </label>

                                        {loader===false && <button className={ css.submit }>{ title }</button>}
                                        {
                                            loader===true && 
                                            <button className={ css.submit } disabled>
                                                <div className={ noDataStyle.button_loader }>
                                                    <i></i><i></i><i></i>
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </form>

                                <Link to={ path.to } title={ path.title } className={ css.link }>{ path.title }</Link>
                            </div>
                        </div>
                    </div>
                );
            } 
        },
        [ path, darkTheme, name, email, password, loader ]
    );

    return content;
}

export function getPath(to, title, header, description) {
    return {
        to: to,
        title: title,
        header: header,
        description: description,
    };
}

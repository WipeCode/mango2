import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
/** Подключение стилей */
import css from "./css/Sing.module.css";
/** Подключение компоненты */
import { LocalUserContext, AppContext } from "../../../context/Context.jsx";
import { setLocalStorage } from "../../../api/localStorage.jsx";

export function Sing({ path, title, description, isSingIn }) {
    const navigate = useNavigate();
    const { darkTheme } = useContext(AppContext);
    const { setLocalId, setLocalRole, setLocalAvatar, setLocalName, setLocalEmail, setLocalIsAuth, setLocalDescription } = useContext(LocalUserContext);

    const [ content, setContent ] = useState(null);
    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ count, setCount ] = useState(0);

    const submit = (e, isSingIn) => {
        e.preventDefault();

        if (!isSingIn && name && email && password) {
            axios.post(`https://api.ebene.ru/post/singup`, {username:name, email:email, password:password})
            .then(function(res) {
                console.log(res);
                if (res?.data?.message) {
                    navigate("../singin");
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            axios.post(`https://api.ebene.ru/post/singin`, {email:email, password:password})
            .then(function(res) {
                // console.log(res);
                if (res?.data?.message) {
                    if (!res["data"]["message"]["img"]) res["data"]["message"]["img"] = res["data"]["message"]["img"] ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU";
                    
                    setLocalAvatar(res["data"]["message"]["img"]);
                    setLocalIsAuth(true);
                    setLocalId(res["data"]["message"]["id"]);
                    setLocalRole(res["data"]["message"]["role"]);
                    setLocalName(res["data"]["message"]["name"]);
                    setLocalEmail(res["data"]["message"]["email"]);
                    setLocalDescription(res["data"]["message"]["description"]);
                    
                    setLocalStorage(
                        {
                            id:res["data"]["message"]["id"],
                            role:res["data"]["message"]["role"],
                            img:res["data"]["message"]["img"],
                            name:res["data"]["message"]["name"],
                            email:res["data"]["message"]["email"],
                            email:res["data"]["message"]["description"],
                        }
                    );

                    navigate("../news");
                }
            })
            .catch(error => {
                console.log(error);
            });
        }

    }

    const changePassword = (value) => {
        setPassword(value);
        setCount(value.length);
    }

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

                                <form onSubmit={ (e) => submit(e, isSingIn) }>
                                    <div className={ css.input }>
                                        { !isSingIn && <input id="name" type="text" placeholder="Name" onChange={ (e) => setName(e.target.value) } required/> }
                                        
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

                                        <button className={ css.submit }>{ title }</button>
                                    </div>
                                </form>

                                <Link to={ path.to } title={ path.title } className={ css.link }>{ path.title }</Link>
                            </div>
                        </div>
                    </div>
                );
            }
        },
        [ path, darkTheme ]
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

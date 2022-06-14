import React, { useContext, useEffect, useState } from "react";
/** Подключение стилей */
import css from "./css/Setting.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import toBase64 from "../../../components/toBase64.jsx";
/** Подключение API */
import { setUserBasicDataById, setUserPasswordById } from "../../../api/aUser.jsx";

export default function Settings() {
    const { localId, localAvatar, localName, localEmail, localDescription, setLocalDescription, setLocalAvatar, setLocalName, setLocalEmail } = useContext(LocalUserContext); 
    const { setPageTitle, darkTheme } = useContext(AppContext);
    
    const [ content, setContent ] = useState(null);
    const [ avatar, setAvatar ] = useState(null);
    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ description, setDescription ] = useState(null);

    const [ oldPassword, setOldPassword ] = useState(null);
    const [ newPassword, setNewPassword ] = useState(null);
    const [ repeatPassword, setRepeatPassword ] = useState(null);

    const onAvatar = async function (target) {
        let file = target.files[0];
        let result = await toBase64(file);
        setAvatar(result);
    }
    
    const onChange = () => {
        if (avatar !== localAvatar || 
            name !== localName || 
            email !== localEmail || 
            description !== localDescription ) {
            // axios
            setUserBasicDataById(localId, img, name, email, description, setLocalAvatar, setLocalName, setLocalEmail, setLocalDescription);
        }

        if (oldPassword && 
            newPassword && 
            repeatPassword && 
            (newPassword === repeatPassword)) setUserPasswordById(oldPassword, newPassword, localId);
    }

    useEffect(() => { setPageTitle("Settings"); }, []);

    useEffect(
        () => {
            console.log(localAvatar);
            if (localAvatar !== avatar) setAvatar(localAvatar);
            if (localName !== name) setName(localName);
            if (localEmail !== email) setEmail(localEmail);
            if (localDescription !== description) setDescription(localDescription);
        },
        [localAvatar, localName, localEmail, localDescription]
    );

    useEffect(
        () => {
            setContent(
                <div className={ [css.wrap, darkTheme?css.dark:css.light].join(" ") }>
                    <h1 className={ css.header }>Settings</h1>
                    <div className={ css.form }>
                        <fieldset className={ css.avatar }>
                            <div className={ css.img }><img src={ avatar } alt="avatar" /></div>
                            <label htmlFor="avatar">Upload file</label>
                            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={ (e) => onAvatar(e.target) }></input>
                        </fieldset>
                        <div className={ css.item }>
                            <p className={ css.title }>Basic</p>
                            <fieldset className={ css.input }>
                                <label htmlFor="name">Name</label>
                                <input type="text" value={ name ?? "" } placeholder="Enter name" id="name" onChange={ (e) => setName(e.target.value) }/>
                            </fieldset>
                            <fieldset className={ css.input }>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" defaultValue={ email } placeholder="Enter email" id="email" onChange={ (e) => setEmail(e.target.value) }/>
                            </fieldset>
                            <fieldset className={ css.input }>
                                <label htmlFor="description">Description</label>
                                <textarea value={ description ?? "" } placeholder="Enter description" id="description" onChange={ (e) => setDescription(e.target.value) }></textarea>
                            </fieldset>
                        </div>
                        <div className={ css.item }>
                            <p className={ css.title }>Password</p>
                            <fieldset className={ css.input }>
                                <label htmlFor="old_password">Old password</label>
                                <input type="password" placeholder="Enter old password" id="old_password" onChange={ (e) => setOldPassword(e.target.value) }/>
                            </fieldset>
                            <fieldset className={ css.input }>
                                <label htmlFor="new_password">New password</label>
                                <input type="password" placeholder="Enter new password" id="new_password" onChange={ (e) => setNewPassword(e.target.value) }/>
                            </fieldset>
                            <fieldset className={ css.input }>
                                <label htmlFor="repeat_new_password">Repeat password</label>
                                <input type="password" placeholder="Enter repeat password" id="repeat_new_password" onChange={ (e) => setRepeatPassword(e.target.value) }/>
                            </fieldset>
                        </div>
                        <button className={ css.submit } onClick={ () => onChange() }>Change data</button>
                    </div>
                </div>
            );
        },
        [avatar, name, email, description, darkTheme]
    );

    return content;
}
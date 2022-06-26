import React, { useState } from "react";
import axios from 'axios';
import { deleteLocalStorage } from "./localStorage.jsx";
import { getScore } from './aPost.jsx';
import { setLocalStorage } from "./localStorage.jsx";

/* -------------------------------------------------------------------------- */
/*                              CHECKING FUNCTION                             */
/* -------------------------------------------------------------------------- */

export function isCook(role=0) { return +role === 1; }
export function isAdmin(role=0) { return +role === 9; }

/* -------------------------------------------------------------------------- */
/*                              GETTING FUNCTION                              */
/* -------------------------------------------------------------------------- */

 /**
  * Вывод данных о пользователе по ID
  * 
  * @param mixed id - ID просматриваемого пользователя
  * @param mixed localId - ID авотризованного пользователя
  * @param mixed setUser - react hook для изменения состояния данных о пользователе компонента
  * @param mixed navigate - react hook для переадресации
  * @param mixed setLoader - react hook для изменения состояния загрузки компонента
  */
export function getUserById(id=0, localId=0, setUser, navigate, setLoader) {
    axios.get(`https://api.ebene.ru/user?id=${id}&localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"]) {
            if (res["data"]["message"]["score"]) res["data"]["message"]["score"] = getScore();
            else res["data"]["message"]["score"] = 0;

            setUser(res["data"]["message"]);
            setLoader(false);
        } else navigate('../');
    })
    .catch(error => {
        console.log(error);
        setUser(null);
        setLoader(false);
        navigate('../');
    });          
}

 /**
  * Подписки пользователя
  *
  * @param mixed id - ID просматриваемого пользователя
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setUsers - react hook для изменения состояния пользователей (подписок) компонента
  * @param mixed setLoader - react hook для изменения состояния загрузки компонента
  */
export function getUserFollowingById(id=0, localId=0, setUsers, setLoader) {
    axios.get(`https://api.ebene.ru/followings?id=${id}&localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"]) {
            setUsers(res["data"]["message"]);
            setLoader(false);
        }
    })
    .catch(error => {
        console.log(error);
        setUsers(null);
        setLoader(false);
    });
}

 /**
  * Получение подписчиков пользователя
  * 
  * @param mixed id - ID просматриваемого пользователя
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setUsers - react hook для изменения состояния пользователей (подписчиков) компонента
  * @param mixed setLoader - react hook для изменения состояния загрузки компонента
  */
export function getUserFollowersById(id=0, localId=0, setUsers, setLoader) {
    axios.get(`https://api.ebene.ru/followers?id=${id}&localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"]) {
            setUsers(res["data"]["message"]);
            setLoader(false);
        }
    })
    .catch(error => {
        console.log(error);
        setUsers(null);
        setLoader(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                              SETTING FUNCTION                              */
/* -------------------------------------------------------------------------- */

 /**
  * Подписаться/отписаться на/от пользователя
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed userId - ID пользователя, на которого подписываются
  * @param boolean isfollow - статус подписки
  * @param mixed setIsFollow - react hook для изменения состояния подписки компонента
  * @param mixed setLoader - react hook для изменения состояния загрузки компонента
  */
export function setFollow(localId, userId, isfollow, setIsFollow, setLoader) {
    axios.post(`https://api.ebene.ru/editFollow`, {localId:localId, userId:userId, isfollow:isfollow})
    .then(function(res) {
        if (res["data"]["message"]) {
            setIsFollow(isfollow);
            setLoader(false);
        }
    })
    .catch(error => {
        console.log(error);
        setLoader(false);
    });
}

 /**
  * Редактирование основных данных пользователя
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed avatar - изображение (аватар) в base64
  * @param mixed name - псевдоним
  * @param mixed email - электронная почта
  * @param mixed description - описание
  * @param mixed setLoader - react hook для изменения состояния загрузки для кнопки
  * @param mixed setLoaderEdit - react hook для изменения состояния загрузки для обновления данных компонента
  */
export function setUserBasicDataById(localId, avatar, name, email, description, setLoader, setLoaderEdit) {
    axios.post(`https://api.ebene.ru/editBasicUser`, {localId:localId, img:avatar, name:name, email:email, description:description})
    .then(function(res) {
        setLocalStorage(
            {
                name:name,
                email:email,
                description:description,
            }
        );

        setLoader(false);
        setLoaderEdit(false);
    })
    .catch(error => {
        console.log(error);
        setLoader(false);
        setLoaderEdit(false);
    });
}

export function setUserPasswordById(oldPassword, newPassword, userId) {
    axios.post(`https://api.ebene.ru/editBasicUser`, {localId:localId, img:avatar, name:name, email:email, description:description})
    .then(function(res) {
        setLocalStorage(
            {
                name:name,
                email:email,
                description:description,
            }
        );

        setLoader(false);
        setLoaderEdit(false);
    })
    .catch(error => {
        console.log(error);
        setLoader(false);
        setLoaderEdit(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                                SING FUNCTION                               */
/* -------------------------------------------------------------------------- */

 /**
  * Выход из аккаунта
  */
export function logOut() {
    deleteLocalStorage(["id", "name", "img", "email", "role"]);
    return true;
}

 /**
  * Регитсрация пользователя
  * 
  * @param mixed name - имя пользователя
  * @param mixed email - электронная почта
  * @param mixed password - пароль
  * @param mixed setLoader - react hook для изменения состояния загрузки компонента
  * @param mixed navigate - react hook для переадресации
  */
export function singUp(name, email, password, setLoader, navigate) {
    axios.post(`https://api.ebene.ru/singup`, {username:name, email:email, password:password})
    .then(function(res) {
        if (res?.data?.message) {
            setLoader(false);
            navigate("../singin");
        }
    })
    .catch(error => { 
        console.log(error);
        setLoader(false);
    });
}

 /**
  * Авторизация пользователя
  * 
  * @param mixed email - электронная почта
  * @param mixed password - пароль
  * @param mixed setLoader - react hook для изменения состояния загрузки компонента
  * @param mixed setThisLocalId - react hook для изменения состояния ID пользователя
  * @param mixed setThisLocalRole - react hook для изменения состояния роли пользователя
  * @param mixed setThisLocalName - react hook для изменения состояния имени пользователя
  * @param mixed setThisLocalEmail - react hook для изменения состояния электронной почты пользователя
  * @param mixed setThisLocalDescription - react hook для изменения состояния описания пользователя
  */
export function singIn(email, password, setLoader, setThisLocalId, setThisLocalRole, setThisLocalName, setThisLocalEmail, setThisLocalDescription) {
    axios.post(`https://api.ebene.ru/singin`, {email:email, password:password})
    .then(function(res) {
        if (res?.data?.message) {
            setThisLocalId(res["data"]["message"]["id"]);
            setThisLocalRole(res["data"]["message"]["role"]);
            setThisLocalName(res["data"]["message"]["name"]);
            setThisLocalEmail(res["data"]["message"]["email"]);
            setThisLocalDescription(res["data"]["message"]["description"]);

            setLocalStorage(
                {
                    id:res["data"]["message"]["id"],
                    role:res["data"]["message"]["role"],
                    name:res["data"]["message"]["name"],
                    email:res["data"]["message"]["email"],
                    description:res["data"]["message"]["description"],
                }
            );
        } else console.log(res);

        setLoader(false);
    })
    .catch(error => {
        console.log(error);
        setLoader(false);
    });
}
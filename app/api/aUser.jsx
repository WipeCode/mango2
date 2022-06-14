import React, { useState } from "react";
import axios from 'axios';
import { deleteLocalStorage } from "./localStorage.jsx";
import { getScore } from './aPost.jsx';

/* -------------------------------------------------------------------------- */
/*                              CHECKING FUNCTION                             */
/* -------------------------------------------------------------------------- */

export function isCook(role=0) { return +role === 1; }
export function isAdmin(role=0) { return +role === 9; }

/* -------------------------------------------------------------------------- */
/*                              GETTING FUNCTION                              */
/* -------------------------------------------------------------------------- */

export function getUserById(id=0, localId=0, setUser, navigate, setLoader) {
    // console.log(`%caUser: getUserById(id=${id}, localId=${localId})`, "background:#066BC6;color:white;padding:1rem;");
    axios.get(`https://api.ebene.ru/get/user?id=${id}&localId=${localId}`)
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            if (!res["data"]["message"]["img"]) {
                res["data"]["message"]["img"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU";
            }

            if (res["data"]["message"]["score"]) res["data"]["message"]["score"] = getScore();
            else res["data"]["message"]["score"] = 0;

            setUser( res["data"]["message"] );
            setLoader(false);
        } else navigate('../');
    })
    .catch(error => {
        console.log(error);
    });          
}

export function getUserFollowingById(id=0, localId=0, setUsers, setLoader) {
    // console.log(`%caUser: getUserFollowingById(id=${id}, localId=${localId})`, "background:#066BC6;color:white;padding:1rem;");
    axios.get(`https://api.ebene.ru/get/followings?id=${id}&localId=${localId}`)
    .then(function(res) {
        console.log(res);
        if (res["data"]["message"]) {
            setUsers(res["data"]["message"]);
            setLoader(false);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

export function getUserFollowersById(id=0, localId=0, setUsers, setLoader) {
    // console.log(`%caUser: getUserFollowersById(id=${id}, localId=${localId})`, "background:#066BC6;color:white;padding:1rem;");
    axios.get(`https://api.ebene.ru/get/followers?id=${id}&localId=${localId}`)
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            setUsers(res["data"]["message"]);
            setLoader(false);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                              SETTING FUNCTION                              */
/* -------------------------------------------------------------------------- */

export function setFollow(localId, userId, isfollow, setIsFollow) {
    // console.log(`%caUser: follow(localId=${localId}, userId=${userId}, isfollow=${isfollow})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/editFollow`, {localId:localId, userId:userId, isfollow:isfollow})
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            setIsFollow(isfollow);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

export function setUserBasicDataById(localId, img, name, email, description, setLocalAvatar, setLocalName, setLocalEmail, setLocalDescription) {
    console.log(`%caUser: setUserBasicDataById()`, "background:#066BC6;color:white;padding:1rem;");

}

export function setUserPasswordById(password, newPassword, userId) {
    console.log(`%caUser: setUserPasswordById(password=${password}, newPassword=${newPassword}, userId=${userId})`, "background:#066BC6;color:white;padding:1rem;");
}

/* -------------------------------------------------------------------------- */
/*                                SING FUNCTION                               */
/* -------------------------------------------------------------------------- */

export function logOut() {
    deleteLocalStorage(["id", "name", "img", "email", "role"]);
    return true;
}

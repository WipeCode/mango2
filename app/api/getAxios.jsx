import React from "react";
import axios from 'axios';

export function POST(module, data, set=null) {
    axios.post(`https://api.ebene.ru/post/${module}`, data)
    .then(function(res) {
        console.log(res);
        if (set) console.log(set);
    })
    .catch(error => {
        console.log(error);
    });
}

export function GET(module, data=null, set=null) {
    if (data!==null) {
        let str = [];
        for (let e in data) str.push(`${e}=${data[e]}`);
        data = str.join("&");
    }

    axios.get(`https://api.ebene.ru/get/${module}?${data}`)
    .then(function(res) {
        console.log(res);

    })
    .catch(error => {
        console.log(error);
    });
}
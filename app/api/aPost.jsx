import React from "react";
import axios from 'axios';

const serverPath = "https://api.ebene.ru";

/* -------------------------------------------------------------------------- */
/*                              GETTING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

export function getPostsById(id=0) {
    // console.log(`%caPost: getPostsById(id=${id})`, "background:#066BC6;color:white;padding:1rem;");
    // axios.get(`https://api.ebene.ru/get/userPosts?id=${id}`)
    // .then(function(res) {
    //     console.log(res);
    //     if (res["data"]["message"]) {
            
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // });
    
    let result = [];

    if (id===7) {
        result = [
            {
                id:18, 
                user: {
                    id:7,
                    name:"WipeCode",
                },
                name:"Chicken and pineapple pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
            {
                id:19, 
                user: {
                    id:7,
                    name:"WipeCode",
                },
                name:"Chicken and pineapple pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
            {
                id:18, 
                user: {
                    id:7,
                    name:"WipeCode",
                },
                name:"4 Cheese Pizza at Home",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
        ];
    } else if (id===9) {
        result = [
            {
                id:21, 
                user: {
                    id:9,
                    name:"Tom",
                },
                name:"Pan pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
            {
                id:22, 
                user: {
                    id:9,
                    name:"Tom",
                },
                name:"Kefir pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
            {
                id:23, 
                user: {
                    id:9,
                    name:"Tom",
                },
                name:"Berry brownie pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
        ];
    } else if (id===12) {
        result = [
            {
                id:18, 
                user: {
                    id:12,
                    name:"WipeCode",
                },
                name:"Chicken and pineapple pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:false,
            },
        ];
    }
    else result = null;

    return result ? mapArticles(result) : result;
}

export function getMarksById(id=0) {
    // console.log(`%caPost: getMarksById(id=${id})`, "background:#066BC6;color:white;padding:1rem;");
    
    let result = [];

    if (id===7) {
        result = [
            {
                id:21, 
                user: {
                    id:9,
                    name:"Tom",
                },
                name:"Pan pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:true,
            },
            {
                id:22, 
                user: {
                    id:9,
                    name:"Tom",
                },
                name:"Kefir pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:true,
            },
            {
                id:23, 
                user: {
                    id:9,
                    name:"Tom",
                },
                name:"Berry brownie pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:true,
            },
        ];
    } else if (id===9) {
        result = [
            {
                id:18, 
                user: {
                    id:7,
                    name:"WipeCode",
                },
                name:"Chicken and pineapple pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:true,
            },
            {
                id:19, 
                user: {
                    id:7,
                    name:"WipeCode",
                },
                name:"Chicken and pineapple pizza",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:true,
            },
            {
                id:18, 
                user: {
                    id:7,
                    name:"WipeCode",
                },
                name:"4 Cheese Pizza at Home",
                img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
                score: {
                    star1:0,
                    star2:0,
                    star3:0,
                    star4:0,
                    star5:0,
                },
                date:"12/12/2022 18:00",
                ismark:true,
            },
        ];
    } else result = null;

    return result ? mapArticles(result) : result;
}

export function getDraftsById(id=0) {
    // console.log(`%caPost: getDraftsById(id=${id})`, "background:#066BC6;color:white;padding:1rem;");
    let result = [
        {
            id:24, 
            user: {
                id:7,
                name:"WipeCode",
            },
            name:"Closed pizza with chicken",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:1,
                star2:3,
                star3:7,
                star4:10,
                star5:100,
            },
            date:"12/12/2022 18:00",
            ismark:false,
            isdraf:true
        },
    ];

    return mapArticles(result);
}

 /**
  * Вывод статьи по ID
  * 
  * @param mixed id - ID статьи
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setArticle - react hook для присваивания переменной ответ от сервера
  * @param mixed setLoader - react hook для редактирования состояния загрузки
  * @param mixed navigate - функция для переадресации
  */
export function getArticleById(id, localId, setArticle, setLoader, navigate) {
    axios.get(`${serverPath}/get/article?id=${id}&localId=${localId}`)
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            setArticle(res["data"]["message"]);
            setLoader(false);
        } else if (res["data"]["message"] === false) navigate('../');
    })
    .catch(error => { console.log(error); });
}

 /** Вычисление средней оценки статьи
  * 
  * @param score массив данных о всех оценках пользователей
  * @return среднея оценка пользователей
  */
export function getScore(score) {
    let star1 = score?.star1 ?? 0, 
        star2 = score?.star2 ?? 0, 
        star3 = score?.star3 ?? 0, 
        star4 = score?.star4 ?? 0, 
        star5 = score?.star5 ?? 0;

    if (star1 === 0 &&
        star2 === 0 &&
        star3 === 0 &&
        star4 === 0 &&
        star5 === 0 ) return 0;

    let s1 = +star1 ? star1 * 1 : 0,
        s2 = +star2 ? star2 * 2 : 0,
        s3 = +star3 ? star3 * 3 : 0,
        s4 = +star4 ? star4 * 4 : 0,
        s5 = +star5 ? star5 * 5 : 0;

    return ((s1 + s2 + s3+ s4+ s5) / ( star1 + star2 + star3 + star4 + star5 )).toFixed(1);
}

export function getNewsByUserId(id=0) {
    console.log(`%caPost: getNewsByUserId(id=${id})`, "background:#066BC6;color:white;padding:1rem;");

    let result = [
        {
            id:21, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Pan pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
        {
            id:22, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Kefir pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
        {
            id:23, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Berry brownie pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
    ];

    return mapArticles(result);
}

export function getNewArticles() {
    // console.log(`%caPost: getNewArticles()`, "background:#066BC6;color:white;padding:1rem;");

    let result = [
        {
            id:21, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Pan pizza",
            img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:22, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Kefir pizza",
            img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:23, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Berry brownie pizza",
            img:"https://weeattogether.com/wp-content/uploads/2018/02/6-Amazing-Food-Photography-Tricks-You-Need-To-Know-Pancakes.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:18, 
            user: {
                id:7,
                name:"WipeCode",
            },
            name:"Chicken and pineapple pizza",
            img:"https://i.pinimg.com/originals/bd/ff/16/bdff16ac26af19f45669e6a137ab5914.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
        {
            id:19, 
            user: {
                id:7,
                name:"WipeCode",
            },
            name:"Chicken and pineapple pizza",
            img:"http://papers.co/wallpaper/papers.co-nu10-food-art-dessert-nature-34-iphone6-plus-wallpaper.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
    ];

    return mapArticles(result);
}

export function getDiscovery(localId=0, setPosts, setLoader) {
    // console.log(`%caPost: getDiscovery(localId=${localId})`, "background:#066BC6;color:white;padding:1rem;");

    let result = [
        {
            id:21, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Pan pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:22, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Kefir pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:23, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Berry brownie pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:18, 
            user: {
                id:7,
                name:"WipeCode",
            },
            name:"Chicken and pineapple pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
        {
            id:19, 
            user: {
                id:7,
                name:"WipeCode",
            },
            name:"Chicken and pineapple pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:false,
        },
    ];

    result = mapArticles(result);

    setPosts(result);
    setLoader(false);
}

export function getFilter(searchText, sordDate, sordPeople, sordTime, sordDifficulty, sordIsMore4, localId=0, setPosts, setLoader) {
    if (sordDate === "none") sordDate = null;
    if (sordTime === "none") sordTime = null;
    if (sordPeople === "none") sordPeople = null;
    if (sordDifficulty === "none") sordDifficulty = null;
    // console.log(`%caPost: getFilter(searchText=${searchText}, sordDate=${sordDate}, sordPeople=${sordPeople}, sordTime=${sordTime}, sordDifficulty=${sordDifficulty}, sordIsMore4=${sordIsMore4}, localId=${localId})`, "background:#066BC6;color:white;padding:1rem;");

    let result = [
        {
            id:21, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Pan pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        },
        {
            id:22, 
            user: {
                id:9,
                name:"Tom",
            },
            name:"Kefir pizza",
            img:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/a83e9e121106883.60bf5311772e8.jpg",
            score: {
                star1:0,
                star2:0,
                star3:0,
                star4:0,
                star5:0,
            },
            date:"12/12/2022 18:00",
            ismark:true,
        }
    ];

    result = mapArticles(result);

    setPosts(result);
    setLoader(false);
}

/* -------------------------------------------------------------------------- */
/*                              SETTING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

export function setScoreById(articleId, userId, scoreId, score) {
    console.log(`%caPost: setScore(articleId=${articleId}, userId=${userId}, scoreId=${scoreId}, score=${score})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/editScore`, {articleId:articleId, userId:userId, score:score, scoreId:scoreId})
    .then(function(res) {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    });
}

 /**
  * Добавление статьи в закладки
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed articleId - ID статьи
  * @param mixed idMark - ID закладки
  */
export function setIsMark(localId, articleId, idMark, setMark) {
    // console.log(`%caPost: setIsMark(localId=${localId}, articleId=${articleId}, idMark=${idMark})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/editMark`, {localId:localId, articleId:articleId, idMark:idMark})
    .then(function(res) {
        // console.log(res);
        setMark(res?.data?.message ?? null);
    })
    .catch(error => {
        console.log(error);
    });
}

 /**
  * Публикация/отмена публикации статьи
  * 
  * @param mixed articleId - ID статьи
  * @param mixed isPublic - новый статус (true-'public', false-'draft')
  * @param mixed setIsPublic - react hook для изменения публикации в компоненте
  * @param mixed setLoaderPublic - react hook для изменения статуса загрузки в компоненте
  */
export function setStatusArticle(articleId, isPublic, setIsPublic, setLoaderPublic) {
    // console.log(`%caPost: setStatusArticle(articleId=${articleId}, isPublic=${isPublic})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`${serverPath}/post/editArticleStatus`, {articleId:articleId, isDraft:isPublic})
    .then(function(res) {
        if (res["data"]["message"]) {
            setIsPublic(!isPublic);
            setLoaderPublic(false);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

 /**
  * Редактирование статьи
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed articleId - ID редактируемой статьи
  * @param mixed newArticleArray - новые данные статьи 
  */
export function setArticleById(setLoaderEdit, localId, articleId, newArticleArray) {
    // console.log(`%caPost: setArticleById()`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/editArticle`, {localId:localId, articleId:articleId, newArticleArray:newArticleArray})
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            setLoaderEdit(false);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                                ADD FUNCTION                                */
/* -------------------------------------------------------------------------- */

 /**
  * Добавление статьи
  * 
  * @param mixed navigate - функция для переадресации
  * @param mixed img - главыное изображение
  * @param mixed name - наименование
  * @param mixed description - описание
  * @param mixed difficulty - сложность приготовения
  * @param mixed calories - калорийность
  * @param mixed minutes - время приготовления в минутах
  * @param mixed steps - этапы приготовления
  * @param mixed ingredients - ингридиенты
  * @param mixed localId - ID авторизованного пользователя
  */
export function addNewArticle(setLoader, navigate, img, name, description, difficulty, calories, minutes, steps, ingredients, localId) {
    let data = {
        img:img, 
        name:name, 
        description:description, 
        difficulty:difficulty, 
        calories:calories, 
        minutes:minutes, 
        steps:steps, 
        ingredients:ingredients, 
        localId:localId
    };

    axios.post(`${serverPath}/post/add`, data)
    .then(function(res) {
        console.log(res);
        if (res["data"]["message"]) {
            setLoader(false);
            navigate(`../editor/${res["data"]["message"]}`);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                             DELETING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

 /**
  * Удаление статьи
  * 
  * @param mixed navigate - функция для переадресации
  * @param mixed articleId - ID статьи
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setLoaderDelete - react hook для изменения статуса загрузки в компоненте
  * @param mixed setArticles - react hook для изменения выводимых статей в компоненте
  */
export function deleteArticleById(navigate, articleId, localId=null, setLoaderDelete, isEditor=false, setArticles=null) {
    // console.log(`%caPost: deleteArticle(localId=${localId}, articleId=${articleId})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`${serverPath}/post/deleteArticle`, {articleId:articleId})
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            setLoaderDelete(false);

            if (setArticles) {}
            else navigate(isEditor ? `../` : `../people/${localId}/posts`);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                               LOCAL FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

function mapArticles(result) {
    result = result.map((m) => {
        m["people"] = (+m["score"]["star1"])+(+m["score"]["star2"])+(+m["score"]["star3"])+(+m["score"]["star4"])+(+m["score"]["star5"]);
        m["score"] = getScore(m["score"]);
        return m;
    });

    return result;
}
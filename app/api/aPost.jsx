import React from "react";
import axios from 'axios';

const serverPath = "https://api.ebene.ru";

/* -------------------------------------------------------------------------- */
/*                              GETTING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

 /**
  * Вывод статей, опубликованых пользователем по ID
  * 
  * @param mixed id - ID просматриваемого пользователя
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getPostsById(id, localId, setPost, setLoader) {
    axios.get(`https://api.ebene.ru/userPosts?id=${id}&localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"] && res["data"]["message"]?.length>0) {
            setPost( mapArticles(res["data"]["message"]) );
        } else setPost(null);

        setLoader(false);
    })
    .catch(error => {
        console.log(error);
        setPost(null);
        setLoader(false);
    });
}

 /**
  * Вывод статей, добавленные в закладки пользователя по ID
  * 
  * @param mixed id - ID просматриваемого пользователя
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getMarksById(id, localId, setPost, setLoader) {
    axios.get(`https://api.ebene.ru/userMarks?id=${id}&localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"] && res["data"]["message"]?.length>0) {
            setPost( mapArticles(res["data"]["message"]) );
        } else setPost(null);

        setLoader(false);
    })
    .catch(error => {
        console.log(error);
        setPost(null);
        setLoader(false);
    });
}

 /**
  * Вывод черновиков пользователя по ID
  * 
  * @param mixed id - ID пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getDraftsById(id, setPost, setLoader) {
    axios.get(`https://api.ebene.ru/userDrafts?id=${id}`)
    .then(function(res) {
        if (res["data"]["message"] && res["data"]["message"]?.length>0) {
            setPost( mapArticles(res["data"]["message"]) );
        } else setPost(null);

        setLoader(false);
    })
    .catch(error => {
        console.log(error);
        setPost(null);
        setLoader(false);
    });
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
    axios.get(`${serverPath}/article?id=${id}&localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"]) {
            setArticle(res["data"]["message"]);
            setLoader(false);
        } else if (res["data"]["message"] === false) navigate('../');
    })
    .catch(error => { 
        console.log(error);
        setLoader(false);
        navigate('../');
    });
}

 /**
  * Вывод новых статей, которыйе были опубликованы пользователя, на которых подписан авторизованный пользователь
  * 
  * @param mixed localId - ID авыторизованного пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getNewsByUserId(localId, setPost, setLoader) {
    axios.get(`${serverPath}/userNews?localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"] && res["data"]["message"]?.length>0) {
            setPost( mapArticles(res["data"]["message"]) );
        } else setPost(null);

        setLoader(false);
    })
    .catch(error => { 
        console.log(error);
        setLoader(false);
        setPost(null);
    });
}

 /**
  * Вывод новых опубликованных статей на сайте 
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getNewArticles(localId, setPost, setLoader) {
    axios.get(`https://api.ebene.ru/newArticles?localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"] && res["data"]["message"]?.length>0) {
            setPost( mapArticles(res["data"]["message"]) );
        } else setPost(null);

        setLoader(false);
    })
    .catch(error => {
        console.log(error);
        setPost(null);
        setLoader(false);
    });
}

 /**
  * Вывод опубликованных статей для поиска 
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getDiscovery(localId, setPost, setLoader) {
    axios.get(`https://api.ebene.ru/discovery?localId=${localId}`)
    .then(function(res) {
        if (res["data"]["message"] && res["data"]["message"]?.length>0) {
            setPost( mapArticles(res["data"]["message"]) );
        } else setPost(null);

        setLoader(false);
    })
    .catch(error => {
        console.log(error);
        setPost(null);
        setLoader(false);
    });
}

 /**
  * Фильтрация данных
  * 
  * @param mixed searchText - наименование
  * @param mixed sordDate - свежесть даты редактирования
  * @param mixed sordTime - время приготовления
  * @param mixed sordDifficulty - уровень сложности приготовления
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed setPost - react hook для изменения состояния массива публикаций (статей)
  * @param mixed setLoader - react hook для изменения состояния загрузки
  */
export function getFilter(searchText, sordDate, sordTime, sordDifficulty, localId, setPost, setLoader) {
    if (sordDate === "none") sordDate = null;
    if (sordTime === "none") sordTime = null;
    if (sordDifficulty === "none") sordDifficulty = null;

    if (searchText || sordDate || sordTime || sordDifficulty) {
        axios.get(`https://api.ebene.ru/filter?searchText=${searchText}&sordDate=${sordDate}&sordTime=${sordTime}&sordDifficulty=${sordDifficulty}&localId=${localId}`)
        .then(function(res) {
            console.log(res);
            if (res["data"]["message"] && res["data"]["message"]?.length>0) {
                setPost( mapArticles(res["data"]["message"]) );
            } else setPost(null);
    
            setLoader(false);
        })
        .catch(error => {
            console.log(error);
            setPost(null);
            setLoader(false);
        });
    } else getDiscovery(localId, setPost, setLoader);
}

/* -------------------------------------------------------------------------- */
/*                              SETTING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

 /**
  * Оценка статьи
  * 
  * @param mixed articleId - ID статьи
  * @param mixed userId - ID авторизованного пользователя
  * @param mixed scoreId - ID предыдущей оценки пользователя
  * @param mixed score - новая оценка пользователя
  * @param mixed setScoreId - react hook для редактирования ID оценки в компоненте
  */
export function setScoreById(articleId, userId, scoreId, score, setScoreId) {
    axios.post(`https://api.ebene.ru/editScore`, {articleId:articleId, userId:userId, score:score, scoreId:scoreId})
    .then(function(res) {
        if (res["data"]["message"]) {
            setScoreId(res["data"]["message"]);
        }
    })
    .catch(error => { console.log(error); });
}

 /**
  * Добавление статьи в закладки
  * 
  * @param mixed localId - ID авторизованного пользователя
  * @param mixed articleId - ID статьи
  * @param mixed idMark - ID закладки
  */
export function setIsMark(localId, articleId, idMark, setMark) {
    axios.post(`https://api.ebene.ru/editMark`, {localId:localId, articleId:articleId, idMark:idMark})
    .then(function(res) {
        setMark(res?.data?.message ?? null);
    })
    .catch(error => { console.log(error); });
}

 /**
  * Публикация/отмена публикации статьи
  * 
  * @param mixed articleId - ID статьи
  * @param mixed isPublic - новый статус (true-'public', false-'draft')
  * @param mixed setIsPublic - react hook для изменения публикации в компоненте
  * @param mixed setLoaderPublic - react hook для изменения статуса загрузки в компоненте
  * @param mixed callback - дополнительная функция, которая будет выполнена после получения ответа с сервера
  */
export function setStatusArticle(articleId, isPublic, setIsPublic, setLoaderPublic, callback=null) {
    axios.post(`${serverPath}/editArticleStatus`, {articleId:articleId, isDraft:isPublic})
    .then(function(res) {
        if (res["data"]["message"]) {
            setIsPublic(!isPublic);
            setLoaderPublic(false);
            if (callback) callback();
        }
    })
    .catch(error => {
        console.log(error);
        setLoaderPublic(false);
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
    axios.post(`https://api.ebene.ru/editArticle`, {localId:localId, articleId:articleId, newArticleArray:newArticleArray})
    .then(function(res) {
        if (res["data"]["message"]) {
            setLoaderEdit(false);
        }
    }).catch(error => { 
        console.log(error); 
        setLoaderEdit(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                                ADD FUNCTION                                */
/* -------------------------------------------------------------------------- */

 /**
  * Добавление статьи 
  * 
  * @param mixed setLoader - react hook для изменения статуса загрузки в компоненте
  * @param mixed setArticleId - react hook для изменения состояния ID статьи в компоненте 
  * @param mixed navigate - react hook для переадресации
  * @param mixed img - главыное изображение
  * @param mixed name - наименование
  * @param mixed description - описание
  * @param mixed difficulty - сложность приготовения
  * @param mixed calories - калорийность
  * @param mixed minutes - время приготовления в минутах
  * @param mixed steps - этапы приготовления
  * @param mixed ingredients - ингридиенты
  * @param mixed localId - ID авторизованного пользователя- 
  */
export function addNewArticle(setLoader, setArticleId, navigate, img, name, description, difficulty, calories, minutes, steps, ingredients, localId) {
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

    axios.post(`${serverPath}/addArticle`, data)
    .then(function(res) {
        console.log(res);
        if (res["data"]["message"]) {
            setLoader(false);
            setArticleId(res["data"]["message"]);
            navigate(`../editor/${res["data"]["message"]}`);
        }
    })
    .catch(error => { 
        console.log(error); 
        setLoader(false);
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
  * @param mixed callback - дополнительная функция, которая будет выполнена после получения ответа с сервера
  */
export function deleteArticleById(navigate, articleId, localId=null, setLoaderDelete, isEditor=false, setArticles=null, callback=null) {
    axios.post(`${serverPath}/deleteArticle`, {articleId:articleId})
    .then(function(res) {
        if (res["data"]["message"]) {
            setLoaderDelete(false);

            if (isEditor) navigate(isEditor ? `../` : `../people/${localId}/posts`);
            else if (callback) callback();
        }
    })
    .catch(error => {
        console.log(error);
        setLoaderDelete(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                               EXTRA FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

function mapArticles(result) {
    result = result.map((m) => {
        m["people"] = (+m["score"]["star1"])+(+m["score"]["star2"])+(+m["score"]["star3"])+(+m["score"]["star4"])+(+m["score"]["star5"]);
        m["score"] = getScore(m["score"]);
        return m;
    });

    return result;
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
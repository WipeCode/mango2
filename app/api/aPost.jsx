import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
    } else result = null;

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

export function getArticleById(id=0, localId, setArticle, setLoader, navigate=null) {
    console.log(`%caPost: getArticleById(id=${id}, localId=${localId})`, "background:#066BC6;color:white;padding:1rem;");
    axios.get(`https://api.ebene.ru/get/article?id=${id}&localId=${localId}`)
    .then(function(res) {
        console.log(res);
        if (res["data"]["message"]) {
            setArticle(res["data"]["message"]);
            setLoader(false);
        } else if (res["data"]["message"] === false) navigate('../');
    })
    .catch(error => {
        console.log(error);
    });
}

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
            img:"https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
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

export function setScoreById(articleId=0, userId=0, scoreId=0, score=0) {
    // console.log(`%caPost: setScore(articleId=${articleId}, userId=${userId}, scoreId=${scoreId}, score=${score})`, "background:#066BC6;color:white;padding:1rem;");
    // return 3;
    // console.log({articleId:articleId, userId:userId, scoreId:scoreId, score:score});
    // axios.post(`https://api.ebene.ru/post/editScore`, { articleId:articleId, userId:userId, scoreId:scoreId, score:score})
    // .then(function(res) {
    //     console.log(res);
    //     // if (res["data"]["message"]) {}
    // })
    // .catch(error => {
    //     console.log(error);
    // });
}

export function setIsMark(localId, articleId, isMark) {
    // console.log(`%caPost: setIsMark(localId=${localId}, articleId=${articleId}, isMark=${isMark})`, "background:#066BC6;color:white;padding:1rem;");
}

export function setStatusArticle(articleId, isDraft, setIsPublic=null) {
    // console.log(`%caPost: setStatusArticle(articleId=${articleId}, isDraft=${isDraft})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/editArticleStatus`, {articleId:articleId, isDraft:isDraft})
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            if (setIsPublic) {
                setIsPublic(!isDraft);
            }
        }
    })
    .catch(error => {
        console.log(error);
    });
}

export function setArticleById(navigate, localId, articleId, newArticleArray) {
    // console.log(`%caPost: setArticleById()`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/editArticle`, {localId:localId, articleId:articleId, newArticleArray:newArticleArray})
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            navigate(
                res["data"]["message"]==="draft"
                ? `../people/${localId}/drafts` 
                : `../people/${localId}/posts`
            );
        }
    })
    .catch(error => {
        console.log(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                                ADD FUNCTION                                */
/* -------------------------------------------------------------------------- */

export function addNewArticle(navigate, img, name, description, difficulty, calories, minutes, steps, isDraf, ingredients, localId) {
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

    axios.post(`https://api.ebene.ru/post/add`, data)
    .then(function(res) {
        // console.log(res);
        navigate(`../people/${localId}/drafts`);
    })
    .catch(error => {
        console.log(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                             DELETING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

export function deleteArticleById(navigate, articleId, localId=null) {
    // console.log(`%caPost: deleteArticle(localId=${localId}, articleId=${articleId})`, "background:#066BC6;color:white;padding:1rem;");
    axios.post(`https://api.ebene.ru/post/deleteArticle`, {articleId:articleId})
    .then(function(res) {
        // console.log(res);
        if (res["data"]["message"]) {
            if (localId) {
                navigate(`../people/${localId}/posts`);
            }
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
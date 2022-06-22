import React, { useState, useEffect } from "react";
/** Подключение стилей */
import css from "./css/ToScoreCard.module.css";
/** Подключение API  */
import { setScoreById } from "../../../../../api/aPost.jsx";

export default function ToScoreCard({ isAuth, userId, id, score, allScore, setScore, getScore, people, setPeople }) {
    const [ star1, setStar1 ] = useState(null); // кол-во оценивших на 1
    const [ star2, setStar2 ] = useState(null); // кол-во оценивших на 2
    const [ star3, setStar3 ] = useState(null); // кол-во оценивших на 3
    const [ star4, setStar4 ] = useState(null); // кол-во оценивших на 4
    const [ star5, setStar5 ] = useState(null); // кол-во оценивших на 5
    const [ scoreId, setScoreId ] = useState(null); // ID оценки авторизованного пользователя
    const [ userScore, setUserScore ] = useState(0); // Оценка авторизованного пользователя
    const [ localScore, setLocalScore ] = useState(0);

    useEffect(
        () => {
            if (score || localScore) {
                setStar1(allScore.star1);
                setStar2(allScore.star2);
                setStar3(allScore.star3);
                setStar4(allScore.star4);
                setStar5(allScore.star5);
                setScoreId(allScore.id);
                setUserScore(+allScore.user);
                setScore(localScore>0 ? localScore : +score);
            }
        },
        [ score, localScore ]
    );

    function changeStar(n) {
        // Если ранее пользователь уже оценивал статью
        if (userScore) {
            switch(userScore) {
                case 2: setStar2(star2 - 1); break;
                case 3: setStar3(star3 - 1); break;
                case 4: setStar4(star4 - 1); break;
                case 5: setStar5(star5 - 1); break;
                default: setStar1(star1 - 1); break;
            }
        }

        switch(n) {
            case 2: setStar2(star2 + 1); break;
            case 3: setStar3(star3 + 1); break;
            case 4: setStar4(star4 + 1); break;
            case 5: setStar5(star5 + 1); break;
            default: setStar1(star1 + 1); break;
        }

        // Если пользователь ранее еще не оценивал статью
        if (!userScore) setPeople( people+1 ); 

        setScore( getScore({ star1:star1, star2:star2, star3:star3, star4:star4, star5:star5 }) );
        setLocalScore(+n);
        
        let score_id = setScoreById(id, userId, scoreId, n);
        setUserScore(n);
        if (score_id) setScoreId(score_id);
    }

    if (isAuth && userId) {
        return (
            <div className={ css.wrap }>
                <div className={ css.user }>
                    <p>Score this article:</p>
                    <div className={ css.input }>
                        { userScore === 5 ? <input type="radio" id={ `star-${5}` } name="rating" defaultChecked/> : <input type="radio" id={ `star-${5}` } name="rating"/> }
                        <label htmlFor={ `star-${5}` } title={ `star-${5}` } onClick={ () => changeStar(5) }></label>
                        
                        { userScore === 4 ? <input type="radio" id={ `star-${4}` } name="rating" defaultChecked/> : <input type="radio" id={ `star-${4}` } name="rating"/> }
                        <label htmlFor={ `star-${4}` } title={ `star-${4}` } onClick={ () => changeStar(4) }></label>
                        
                        { userScore === 3 ? <input type="radio" id={ `star-${3}` } name="rating" defaultChecked/> : <input type="radio" id={ `star-${3}` } name="rating"/> }
                        <label htmlFor={ `star-${3}` } title={ `star-${3}` } onClick={ () => changeStar(3) }></label>
                        
                        { userScore === 2 ? <input type="radio" id={ `star-${2}` } name="rating" defaultChecked/> : <input type="radio" id={ `star-${2}` } name="rating"/> }
                        <label htmlFor={ `star-${2}` } title={ `star-${2}` } onClick={ () => changeStar(2) }></label>
                        
                        { userScore === 1 ? <input type="radio" id={ `star-${1}` } name="rating" defaultChecked/> : <input type="radio" id={ `star-${1}` } name="rating"/> }
                        <label htmlFor={ `star-${1}` } title={ `star-${1}` } onClick={ () => changeStar(1) }></label>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
 
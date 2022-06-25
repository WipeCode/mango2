import React, { useEffect, useState } from "react";
/** Подключение стилей */
import css from "./css/StaticScoreCard.module.css";

export default function StaticScoreCard({ score=null, people=null, IconName=null, GetIcon=null, ClassName=null }) {
    const [ stars, setStars ] = useState(null);
    const [ thisScore, setThisScore ] = useState(null);

    useEffect(
        () => {
            setThisScore(score);
            setStars(getStars(+score, IconName));
        },
        [ score ]
    );

    if (thisScore !== null) {
        return (
            <div className={ [css.wrap, ClassName].join(' ') }>
                <p className={ css.score }>{ thisScore }</p>
                <div className={ css.stars }>
                    {
                        stars.map((m,i) => {
                            return <GetIcon key={i} name={m}/>
                        })
                    }
                </div>
                <p className={ css.people }>({ people })</p>
            </div>
        );
    }
}

function getStars(score, IconName) {
    return  [ IconName.star, IconName.star, IconName.star, IconName.star, IconName.star ]
            .map((m,i) => {
                if (score === 0) return m;
                else if (i+1 === score) return IconName.isstar;
                else if (i < score && score < i+1) return IconName.isstar50;
                else if (i < score) return IconName.isstar;
                else return m;
            });
}
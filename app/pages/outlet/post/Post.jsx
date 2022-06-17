import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/Post.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import ToScoreCard from "../../../components/UI/card/article/stars/ToScoreCard.jsx";
import StaticScoreCard from "../../../components/UI/card/article/stars/StaticScoreCard.jsx";
import UserLineCard from "../../../components/UI/card/user/UserLineCard.jsx";
/** Подключение API  */
import { getArticleById, getScore } from "../../../api/aPost.jsx";
import ArticleSetup from "../../../components/UI/btn/article_setup/ArticleSetup.jsx";

export default function Post() {
    const navigate = useNavigate();
    const location = window.location.pathname;
    
    const { articleId } = useParams();
    const { localIsAuth, localId, localRole } = useContext(LocalUserContext);
    const { setPageTitle, changePagesMath, IconName, GetIcon, darkTheme } = useContext(AppContext);

    const [ score, setScore ] = useState(null); /** Средняя оценка статьи */
    const [ people, setPeople ] = useState(null); /** Кол-во пользователей, оценивших статью */
    const [ loader, setLoader ] = useState(true);
    const [ content, setContent ] = useState(true);
    const [ article, setArticle ] = useState(null);
    const [ articleHeader, setArticleHeader ] = useState(null);

    const getPeople = (score) => {
        if (score) {
            return score['star1']+score['star2']+score['star3']+score['star4']+score['star5'];
        }
    };

    useEffect(
        () => {
            setPageTitle("Post");

            if (localId && article) getArticleById(articleId, localId, setArticle, setLoader, navigate);
            else if (!article) getArticleById(articleId, localId, setArticle, setLoader, navigate);
        },
        [ localId ]
    );

    useEffect(
        () => {
            if (!loader) {
                if (article) {
                    setPageTitle( article?.name );
                    setPeople( getPeople( article?.score ) );
                    setScore( getScore( article?.score ) );
                } else {
                    setContent(
                        <div className={ noDataStyle.wrap }>
                            <div className={ noDataStyle.content }>
                                <h1>Articles</h1>
                                <p>No data available</p>
                            </div>
                        </div>
                    );
                }
            } else {
                setContent(
                    <div className={ noDataStyle.loader }>
                        <main></main>
                    </div>
                );
            }
        },
        [ loader ]
    );

    useEffect(
        () => {
            if (score!==null && people!==null && article) {
                setArticleHeader({
                    articleId: article?.id,
                    creatorId: article?.user?.id,
                    src: article?.img,
                    name: article?.name,
                    score: score,
                    people: people,
                    description: article?.description,
                    difficulty: article?.difficulty,
                    ingredients: article?.ingredients.length,
                    minutes: article?.minutes,
                    calories: article?.calories,
                    isMark: article?.ismark ?? false,
                    isDraft: article?.isdraft ?? false,
                });
            }
        },
        [ score ]
    );
    
    useEffect(
        () => {
            if (articleHeader && article && articleId) {
                setContent(
                    <div className={ [css.wrap, darkTheme ? css.dark : css.light].join(" ") }>
                        <Header
                            darkTheme={ darkTheme }
                            localId={ localId }
                            localRole={ localRole }
                            article={ articleHeader }
                            IconName={ IconName }
                            GetIcon={ GetIcon }
                        />

                        <div className={ css.content }>
                            <Steps 
                                steps={ article.steps }
                            />

                            <Ingredients
                                ingredients={ article.ingredients }
                            />
                        </div>

                        <Footer
                            darkTheme={ darkTheme }
                            localIsAuth={ localIsAuth }
                            localId={ localId }
                            articleId={ articleId }
                            score={ score }
                            article={ article }
                            setScore={ setScore }
                            getScore={ getScore }
                            people={ people }
                            setPeople={ setPeople }
                            location={ location }
                            changePagesMath={ changePagesMath }
                        />
                    </div>
                );
            }
        },
        [ articleHeader, darkTheme ]
    );

    return content;
}

function Header({ darkTheme, localId, localRole, article, IconName, GetIcon }) {
    const [ keyActive, setKeyActive ] = useState(null);
    const getClassItem = (key) => keyActive == key ? [css.item, css.active].join(" ") : css.item;
    const changeKeyActive = (key) => setKeyActive(keyActive == key ? null : key);

    if (article) {
        return (
            <div className={ css.header } id="articleHeader">
                <ArticleSetup
                    darkTheme={ darkTheme }
                    localId={ localId }
                    localRole={ localRole }
                    creatorId={ article.creatorId }
                    isDraft={ article?.isDraft }
                    localIsMark={ article?.isMark }
                    articleId={ article?.articleId }
                    IconName={ IconName }
                    GetIcon={ GetIcon }
                    className={ css.setup }
                />
    
                <div className={ css.img }>
                    <img src={ article?.src } alt="food"/>
                </div>
    
                <div className={ [css.info, localId?css.topSetup:null].join(" ") }>
                    <p className={ [css.title, localId ? css.top : null].join(" ") }>{ article?.name }</p>
                    
                    <StaticScoreCard 
                        score={ article?.score } 
                        people={ article?.people } 
                        IconName={ IconName } 
                        GetIcon={ GetIcon }
                    />
                    
                    <p className={ css.description }>{ article?.description }</p>
                    <div className={ css.statistic }>
                        <div className={ getClassItem("calories") } onClick={ () => changeKeyActive("calories") }>
                            <div className={ css.itemTitle }>
                                <GetIcon name={ IconName.kkal }/>
                                <i className={ css.name }>Calories:</i>
                            </div>
                            <i>{ article?.calories }</i>
                        </div>
    
                        <div className={ getClassItem("difficult") } onClick={ () => changeKeyActive("difficult") }>
                            <div className={ css.itemTitle }>
                                <GetIcon name={ IconName.difficult }/>
                                <i className={ css.name }>Difficulty:</i>
                            </div>
                            <i>{ article?.difficulty }</i>
                        </div>
    
                        <div className={ getClassItem("ingredients") } onClick={ () => changeKeyActive("ingredients") }>
                            <div className={ css.itemTitle }>
                                <GetIcon name={ IconName.ingredients }/>
                                <i className={ css.name }>Ingredients:</i>
                            </div>
                            <i>{ article?.ingredients }</i>
                        </div>
    
    
                        <div className={ getClassItem("time") } onClick={ () => changeKeyActive("time") }>
                            <div className={ css.itemTitle }>
                                <GetIcon name={ IconName.time }/>
                                <i className={ css.name }>Cooking time:</i>
                            </div>
                            <i>{ `${article?.minutes}m` }</i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function Steps({ steps }) {
    return (
        <div className={ css.steps }>
            <p className={ css.title }><i>the</i><b>Process</b></p>
            {
                steps.map((m,i) => {
                    return (
                        <div key={`step-${i}`} className={ css.step }>
                            <span>
                                <p>
                                    <i>{i+1}</i>
                                    <i>step</i>
                                </p>
                            </span>

                            <p className={ css.text }>{ m }</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

function Ingredients({ ingredients }) {
    return (
        <div className={ css.ingresients }>
            <p className={ css.title }><i>the</i><b>ingredients</b></p>
            <ul>
                {
                    ingredients.map((m,i) => {
                        return (
                            <li key={ `ing-${i}` } className={ css.items }>
                                <p><i className={ css.name }>{ m.name }</i></p>
                                <p><i className={ css.unit }>{ m.amount } { m.unit }</i></p>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

function Footer({ darkTheme, localIsAuth, localId, articleId, score, article, setScore, getScore, people, setPeople, location, changePagesMath }) {
    if (article) {
        return (
            <div className={ css.footer }>
                {
                    +localId !== +article?.user?.id &&
                    <ToScoreCard
                        isAuth={ localIsAuth }
                        userId={ localId }
                        id={ articleId }
                        score={ score }
                        allScore={ article.score }
                        setScore={ setScore }
                        getScore={ getScore }
                        people={ people }
                        setPeople={ setPeople }
                    />
                }
    
                <UserLineCard
                    darkTheme={ darkTheme }
                    location={ location }
                    localid={ localId }
                    id={ article?.user?.id }
                    src={ article?.user?.img }
                    name={ article?.user?.name }
                    isfollow={ article?.user?.follow }
                    changePagesMath={ changePagesMath }
                    className={ css.user }
                />
            </div>
        );
    }
}
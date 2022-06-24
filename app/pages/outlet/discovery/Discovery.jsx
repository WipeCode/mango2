import React, { useContext, useEffect, useState } from "react";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/Discovery.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import ArticleCardsWrap from "../../../components/UI/card/article/mini/ArticleCardsWrap.jsx";
/** Подключение API */
import { getDiscovery, getFilter } from "../../../api/aPost.jsx";

export default function Discovery() {
    const location = window.location.pathname;
    const { localId, localRole } = useContext(LocalUserContext);
    const { setPageTitle, changePagesMath, IconName, GetIcon, darkTheme } = useContext(AppContext);
    
    const [ content, setContent ] = useState(null);
    const [ loader, setLoader ] = useState(true);
    const [ posts, setPosts ] = useState(null);
    const [ header, setHeader ] = useState(null);

    const [ sordDate, setSortDate ] = useState(null);
    const [ sordTime, setSortTime ] = useState(null);
    const [ sordDifficulty, setSortDifficulty ] = useState(null);
    const [ searchText, setSearchText ] = useState(null);

    const onFilter = () => {
        setLoader(true);
        getFilter(searchText, sordDate, sordTime, sordDifficulty, localId, setPosts, setLoader);
    }

    const onKey = (e) => {
        if (e === "Enter") { onFilter(); }
    }

    useEffect(
        () => {
            setPageTitle("Discovery");
            getDiscovery(localId, setPosts, setLoader);
        },
        [ localId ]
    );

    useEffect(
        () => {
            setHeader(
                <div className={ css.top }>
                    <div className={ css.search }>
                        <input type="search" placeholder="Search in mango..." onChange={ (e) => setSearchText(e.target.value) } onKeyPress={ (e) => onKey(e.key) }/>
                        <button className={ css.button } onClick={ () => onFilter() }>{ <GetIcon name={ IconName.search }/> }</button>
                    </div>
                    <div className={ css.filter }>
                        <select name="sort-date" id="sort-date" defaultValue="none" onChange={ (e) => setSortDate(e.target.value) }>
                            <option value="none">No date filtering</option>
                            <option value="new-date">Increasing date</option>
                            <option value="old-date">Decreasing date</option>
                        </select>
                        <select name="sort-time" id="sort-time" defaultValue="none" onChange={ (e) => setSortTime(e.target.value) }>
                            <option value="none">No time filtering</option>
                            <option value="time10">{ "<= 10 min" }</option>
                            <option value="time30">{ "<= 30 min" }</option>
                            <option value="time60">{ "<= 60 min" }</option>
                            <option value="timemore">{ ">= 60 min" }</option>
                        </select>
                        <select name="sort-difficulty" id="sort-difficulty" defaultValue="none" onChange={ (e) => setSortDifficulty(e.target.value) }>
                            <option value="none">No difficulty filtering</option>
                            <option value="1">Easily (1 lvl)</option>
                            <option value="2">Medium (2 lvl)</option>
                            <option value="3">Difficult (3 lvl)</option>
                        </select>
                    </div>
                </div>
            );
        },
        [ searchText, sordDate, sordTime, sordDifficulty ]
    );

    useEffect(
        () => {
            if (searchText!==null || 
                sordDate!==null || 
                sordTime!==null || 
                sordDifficulty!==null) {
                    onFilter();
                }
        },
        [ darkTheme, sordDate, sordTime, sordDifficulty ]
    );

    useEffect(
        () => {
            if (!loader) {
                if (posts) {
                    setContent(
                        <div className={ css.content }>
                            {
                                posts 
                                ?   <ArticleCardsWrap
                                        darkTheme={ darkTheme }
                                        articles={ posts }
                                        location={ location }
                                        localId={ localId }
                                        localRole={ localRole }
                                        changePagesMath={ changePagesMath }
                                        IconName={ IconName }
                                        GetIcon={ GetIcon }
                                        className={ css.articles }
                                        callback={ onFilter }
                                    />
                                :   <div className={ noDataStyle.wrap }>
                                        <div className={ noDataStyle.content }>
                                            <h1>Discovery</h1>
                                            <p>No data available</p>
                                        </div>
                                    </div>
                            }
                        </div>
                    );
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
            }
            else {
                setContent(
                    <div className={ noDataStyle.loader }>
                        <main></main>
                    </div>
                );
            }
        },
        [ localId, loader, darkTheme ]
    );

    return (
        <div className={ [css.wrap, darkTheme?css.dark:css.light].join(" ") }>
            { header }

            { content }
        </div>
    );
}
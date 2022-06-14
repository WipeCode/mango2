import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
/** Подключение стилей */
import noDataStyle from "../style/css/NoData.module.css";
import css from "./css/Account.module.css";
/** Подключение компонентов */
import { AppContext, LocalUserContext } from "../../../context/Context.jsx";
import { getPathByAccount } from "../../../router/AppPathConst.jsx";
import FollowBtn from "../../../components/UI/btn/follow/FollowBtn.jsx";
import UserLineCard from "../../../components/UI/card/user/UserLineCard.jsx";
/** Подключение API  */
import { getUserById, getUserFollowingById, getUserFollowersById } from "../../../api/aUser.jsx";

export default function Account() {
    const { id } = useParams();
    const { localId } = useContext(LocalUserContext);
    const { setPageTitle, isDesktop, changePagesMath, IconName, GetIcon, darkTheme } = useContext(AppContext);

    const [ content, setContent ] = useState(null);
    const [ loader, setLoader ] = useState(true);

    const [ user, setUser ] = useState(null);
    const [ isFollow, setIsFollow ] = useState(null);
    const [ isClickFollow, setIsClickFollow ] = useState(false);
    
    const navigate = useNavigate();
    const location = window.location.pathname;
    const path = getPathByAccount( +localId, +id );

    useEffect(
        () => {
            if (id!==null) {
                getUserById(+id, +localId, setUser, navigate, setLoader);
            }
        },
        [ id, localId ]
    );

    useEffect(
        () => {
            setPageTitle( user ? user.name : "Account" );
            setIsClickFollow(false);
        },
        [ user ]
    );

    useEffect(
        () => {
            if (!loader) {
                if (user) {
                    setContent(
                        <div className={ [css.wrap, isClickFollow?css.click:null, darkTheme?css.dark:css.light].join(" ") }>
                            <div className={ css.container }>
                                {
                                    <ModalFollow
                                        darkTheme={ darkTheme}
                                        location={ location }
                                        changePagesMath={ changePagesMath }
                                        localId={ localId }
                                        selectedUser={ id }
                                        isFollowing={ isFollow }
                                        isClickFollow={ isClickFollow }
                                        icon={ <GetIcon name={IconName.cancel}/> }
                                        setIsClickFollow={ setIsClickFollow }
                                    />
                                }
                
                                <Header 
                                    navigate={ navigate }
                                    isDesktop={ isDesktop }
                                    id={ id } 
                                    localId={ localId } 
                                    path={ path } 
                                    selectedUser={ user } 
                                    changePagesMath={ changePagesMath } 
                                    location={ location }
                                    setIsClickFollow={ setIsClickFollow }
                                    setIsFollow={ setIsFollow }
                                />
                
                                <div className={ css.content }>
                                    <div className={ css.links }>
                                        <NavLink key={ path.posts.key } to={ path.posts.to } title={ path.posts.title }>{ path.posts.title }</NavLink>
                                        <NavLink key={ path.marks.key } to={ path.marks.to } title={ path.marks.title }>{ path.marks.title }</NavLink>
                                        { +localId === +id && <NavLink key={ path.drafts.key } to={ path.drafts.to } title={ path.drafts.title }>{ path.drafts.title }</NavLink> }
                                    </div>
                
                                    <div className={ css.artices }>
                                        <Outlet/>
                                    </div>
                                </div>
                            </div>
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
            } else {
                setContent(
                    <div className={ noDataStyle.loader }>
                        <main></main>
                    </div>
                );
            }
        },
        [loader, darkTheme, isClickFollow]
    )

    return content;
}

function Header({ navigate, isDesktop, id, localId, path, selectedUser, changePagesMath, location, setIsClickFollow, setIsFollow }) {
    const onClick = (num, isClick, isFollowing) => {
        if (num > 0) {
            setIsClickFollow(isClick); 
            setIsFollow(isFollowing);

            if (!isDesktop) {
                changePagesMath(location);
                if (isFollowing) navigate(`../people/${id}/following`);
                else navigate(`../people/${id}/followers`);
            }
        }
    }

    return (
        <div className={ css.user }>
            <div className={ css.top }>
                <div className={ css.avatar }>
                    <img src={ selectedUser.img } alt="avatar"/>
                </div>
                <div className={ css.info }>
                    <p className={ css.name }> 
                        <i>{ selectedUser.name }</i>
                        <i>{ selectedUser.role }</i>
                    </p>

                    <div className={ css.static }>
                        <span>
                            <p>{ selectedUser.score }</p>
                            <p>Score</p>
                        </span>
                        <span onClick={ () => onClick(+selectedUser.followers, true, false) }>
                            <p>{ selectedUser.followers }</p>
                            <p>Followers</p>
                        </span>
                        <span onClick={ () => onClick(+selectedUser.following, true, true) }>
                            <p>{ selectedUser.following }</p>
                            <p>Following</p>
                        </span>
                    </div>
                </div>
            </div>

            {selectedUser.description && <p className={ css.description }>{ selectedUser.description }</p>}

            {
                +localId === +id
                ?   <Link 
                        key={ path.settings.key } 
                        to={ path.settings.to } 
                        title={ path.settings.title } 
                        className={ css.settings }
                        onClick={ () => changePagesMath(location) }
                    >{ path.settings.title }</Link>
                :   <FollowBtn 
                        localId={ +localId } 
                        selectedId={ +id }
                        isfollow={ selectedUser.follow }
                    />
            }
        </div>
    );
}

function ModalFollow({  darkTheme, location, changePagesMath, localId, selectedUser, isFollowing, isClickFollow, icon, setIsClickFollow }) {
    const [ follow, setFollow ] = useState(null);
    const [ loader, setLoader ] = useState(true);
    const [ content, setContent ] = useState(null);
    const title = isFollowing ? "Following" : "Followers";

    useEffect(
        () => {
            if (isClickFollow) {
                if (isFollowing) getUserFollowingById(selectedUser, localId, setFollow);
                else getUserFollowersById(selectedUser, localId, setFollow);
                setLoader(false);
            } else {
                setLoader(false);
                setFollow(null);
                setContent(null);
            }
        },
        [ isClickFollow ]
    );

    useEffect(
        () => {
            if (isClickFollow) {
                if (!loader) {
                    if (follow) {
                        setContent(
                            <div className={ css.modal }>
                                <div className={ css.container }>
                                    <div className={ css.modal_name }>
                                        <p>{ title }</p>
                                        <div 
                                            className={ css.cancel } 
                                            onClick={ () => setIsClickFollow(false) }
                                        >{ icon }</div>
                                    </div>
                                    <div className={ css.people }>
                                        {
                                            follow.map((m,i) => {
                                                return (
                                                    <div className={ css.person } key={i}>
                                                        <UserLineCard
                                                            darkTheme={ darkTheme }
                                                            location={ location } 
                                                            localid={ localId } 
                                                            id={ m.id } 
                                                            src={ m.img } 
                                                            name={ m.name } 
                                                            isfollow={ m.isfollow }
                                                            changePagesMath={ changePagesMath }
                                                            className={ css.user }
                                                        />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        setContent(null);
                    }
                } else {
                    setContent(
                        <div className={ noDataStyle.loader }>
                            <main></main>
                        </div>
                    );
                }
            }
        },
        [ follow, loader, darkTheme ]
    );

    return content;
}

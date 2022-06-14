import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
/** Подключение страниц */
import Layout from "../pages/layout/Layout.jsx";
import Articles from "../pages/outlet/articles/Articles.jsx";
import Discovery from "../pages/outlet/discovery/Discovery.jsx";
import Post from "../pages/outlet/post/Post.jsx";
import News from "../pages/outlet/news/News.jsx";
import Editor from "../pages/outlet/editor/Editor.jsx";
import Account from "../pages/outlet/account/Account.jsx";
import Posts from "../pages/outlet/account/nested/Posts.jsx";
import Marks from "../pages/outlet/account/nested/Marks.jsx";
import Drafts from "../pages/outlet/account/nested/Drafts.jsx";
import Following from "../pages/outlet/account/nested/Following.jsx";
import Followers from "../pages/outlet/account/nested/Followers.jsx";
import SingIn from "../pages/outlet/sing/SingIn.jsx";
import SingUp from "../pages/outlet/sing/SingUp.jsx";
import Tools from "../pages/outlet/tools/Tools.jsx";
import Settings from "../pages/outlet/tools/Settings.jsx";
import Fqa from "../pages/outlet/tools/Fqa.jsx";
import FqaGeneral from "../pages/outlet/tools/nested/FqaGeneral.jsx";
import FqaSettings from "../pages/outlet/tools/nested/FqaSettings.jsx";
import FqaEditor from "../pages/outlet/tools/nested/FqaEditor.jsx";
import Error404 from "../pages/outlet/404/404.jsx";

export default function UserRouter({ isDesktop, localId }) {
    return (
        <Routes>
            <Route key="layout" path="/" element={ <Layout/> }>
                <Route key="key-index" path="/" element={ localId ? <Navigate to="/news"/> : <Navigate to="/articles"/> }></Route>
                <Route key="key-articles" path="/articles" element={ <Articles/> }></Route>
                <Route key="key-discovery" path="/discovery" element={ <Discovery/> }></Route>
                <Route key="key-post" path="/articles/:articleId" element={ <Post/> }></Route>
                <Route key="key-sing-in" path="/singin" element={ <SingIn/> }></Route>
                <Route key="key-sing-up" path="/singup" element={ <SingUp/> }></Route>

                <Route key="key-tools" path="/tools" element={ isDesktop ? <Navigate to="/tools/fqa/general"/> : <Tools/> }></Route>
                
                <Route key="key-fqa" path="/tools/fqa" element={ <Fqa/> }>
                    <Route key="key-fqa-general" path="/tools/fqa/general" element={ <FqaGeneral/> }></Route>
                    {
                        localId &&
                        <>
                            <Route key="key-fqa-settings" path="/tools/fqa/settings" element={ <FqaSettings/> }></Route>
                            <Route key="key-fqa-edit" path="/tools/fqa/editor" element={ <FqaEditor/> }></Route>
                        </>
                    }
                </Route>

                <Route key="key-account" path="/people/:id" element={ <Account/> }>
                    <Route key="key-account-posts" path="/people/:id/posts" element={ <Posts/> }></Route>
                    <Route key="key-account-marks" path="/people/:id/marks" element={ <Marks/> }></Route>
                    { localId && <Route key="key-account-drafts" path={ `/people/:id/drafts` } element={ <Drafts/> }></Route> }
                </Route>
                    
                { !isDesktop && <Route key="key-account-marks" path="/people/:id/following" element={ <Following/> }></Route> }
                { !isDesktop && <Route key="key-account-marks" path="/people/:id/followers" element={ <Followers/> }></Route> }

                {
                    localId &&
                    <>
                        <Route key="key-news" path="/news" element={ <News/> }></Route>
                        <Route key="key-editor" path="/editor/:id" element={ <Editor/> }></Route>
                        <Route key="key-tools-settings" path="/tools/settings" element={ <Settings/> }></Route>
                    </>
                }

                <Route key="*" path="*" element={ <Error404/> }></Route>
            </Route>
        </Routes>
    );
}
import React from "react";

export function getPathByTopNav(isDesktop, localIsAuth, localId, IconName, GetIcon) {
    let path = {
        logo: { key:"logo", to:"/", title:"Logo", icon:<GetIcon name={ IconName.logo }/> },
        articles: { key:"articles", to:"/articles", title:"Articles", icon:null },
        discovery: { key:"discovery", to:"/discovery", title:"Discovery", icon:null },
        tools: { key:"tools", to:( isDesktop ? "/tools/fqa" : "/tools" ), title:"FAQs", icon:<GetIcon name={ IconName.settings }/> },
    };
    /** Если пользователь авторизован */
    if (localIsAuth && localId > 0) {
        path = Object.assign(path, {
            news: { key:"news", to:"/news", title:"News", icon:null },
            account: { key:"account", to:`/people/${localId}/posts`, title:"Account", icon:<GetIcon name={ IconName.account }/> },
            settings: { key:"settings", to:"/tools/settings", title:"Settings", icon:<GetIcon name={ IconName.settings }/> },
            editor: { key:"editor", to:"/editor/new", title:"Add post", icon:<GetIcon name={ IconName.add }/> },
        });
    } else {
        path = Object.assign(path, {
            singin: { key:"singin", to:"/singin", title:"Sing In", icon:null },
        });
    }

    return path;
}

export function getPathByBottomNav(localId, IconName, GetIcon) {
    let path = {
        articles: { key:"articles", to:"/articles", title:"Articles", icon:<GetIcon name={ IconName.doc2 }/> },
        discovery: { key:"discovery", to:"/discovery", title:"Discovery", icon:<GetIcon name={ IconName.discovery }/> },
    };
    /** Если пользователь авторизован */
    if (+localId > 0) {
        path = Object.assign(path, {
            news: { key:"news", to:"/news", title:"News", icon:<GetIcon name={ IconName.dis }/> },
            editor: { key:"editor", to:"/editor/new", title:"Add post", icon:<GetIcon name={ IconName.add }/> },
            account: { key:"account", to:`/people/${localId}/posts`, title:"Account", icon:<GetIcon name={ IconName.account }/> },
        });
    } else {
        path = Object.assign(path, {
            singin: { key:"singin", to:"/singin", title:"Sing In", icon:<GetIcon name={ IconName.account }/> },
        });
    }

    return path;
}

export function getPathByTools(localIsAuth, IconName, GetIcon) {
    let path = {
        fqa: { key:"fqa", to:"/tools/fqa/general", title:"FAQs", icon:<GetIcon name={ IconName.fqa }/> },
    }
    /** Если пользователь авторизован */
    if (localIsAuth) {
        path = Object.assign(path, {
            settings: { key:"settings", to:"/tools/settings", title:"Settings", icon:<GetIcon name={ IconName.settings }/> },
        });
    }

    return path;
}

export function getPathByFqa(localIsAuth) {
    let path = { general: { key:"fqa-general", to:"/tools/fqa/general", title:"General", icon:null } };
    /** Если пользователь авторизован */
    if (localIsAuth) {
        path = Object.assign(path, {
            editor: { key:"fqa-editor", to:"/tools/fqa/editor", title:"Editor", icon:null },
            settings: { key:"fqa-settings", to:"/tools/fqa/settings", title:"Setting", icon:null },
        });
    }

    return path;
}

export function getPathByAccount(localId, selectedId) {
    let path = {
        posts: { key:"posts", to:`/people/${selectedId}/posts`, title:"Posts", icon:null },
        marks: { key:"marks", to:`/people/${selectedId}/marks`, title:"Marks", icon:null }
    };
    /** Если id пользователя совпадается с id просматриваемого */
    if (+localId === +selectedId) {
        path = Object.assign(path, { 
            drafts: { key:"drafts", to:`/people/${selectedId}/drafts`, title:"Drafts", icon:null },
            settings: { key:"settings", to:"/tools/settings", title:"Setting", icon:null },
        });
    }

    return path;
}


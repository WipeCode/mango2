import React from "react";
/** Подключение иконок */
import IconsSVG from "./icon/icons.svg";

/** Список наименований доступных иконок */
export const IconName = {
    logo:"logo",
    home:"home",
    account:"account",
    people:"people",
    add:"add",
    bell:"bell",
    mark:"mark",
    ismark:"ismark",
    cancel:"cancel",
    location:"location",
    moder:"moder",
    picture:"picture",
    search:"search",
    sing:"sing",
    star:"star",
    news:"news",
    community:"community",
    discovery:"discovery",
    compass:"compass",
    document:"document",
    dis:"dis",
    settings:"settings",
    doc2:"doc2",
    logout:"logout",
    fqa:"fqa",
    support:"support",
    arrow_right:"arrow-right",
    arrow_left:"arrow-left",
    minus_row:"minus-row",
    isstar:"isstar",
    kkal:"kkal",
    time:"time",
    ingredients:"ingredients",
    isstar50:"isstar50",
    difficult:"difficult",
    isChef:"isChef",
    mark2:"mark2",
    ismark2:"ismark2",
    vk:"vk",
    github:"github",
    youtube:"youtube",
    setup:"setup",
}

export function GetIcon({name, className = null, fill = null, width = 30, height = width}) {
    return (
        <svg className={className} fill={fill} stroke={fill} width={width} height={height}>
            <use xlinkHref={`${IconsSVG}#icon-${name}`} />           
        </svg>
    )
}


"use strict";

const themeMedia = window.matchMedia("(prefers-color-scheme: light)");

const set_title = () => {
    document.title = "New Tab";
};

const set_icon = () => {
    const icon = document.querySelector(".icon");
    if (!icon) return;

    icon.href = themeMedia.matches
        ? "../icons/icon_light128.png"
        : "../icons/icon_dark128.png";
};

set_title();
set_icon();

themeMedia.addEventListener("change", set_icon);

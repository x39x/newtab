"use strict";

const themeMedia = window.matchMedia("(prefers-color-scheme: light)");

const set_title = () => {
    document.title = "New Tab";
};

const set_icon = () => {
    const icon = document.querySelector(".icon");
    if (!icon) return;

    icon.href = themeMedia.matches
        ? "icons/favicon_light.svg"
        : "icons/favicon_dark.svg";
};

let bgObjectUrl = null;
const applyBackground = async (filename) => {
    try {
        const root = await navigator.storage.getDirectory();
        const handle = await root.getFileHandle(filename);
        const file = await handle.getFile();

        // 清理旧 URL
        if (bgObjectUrl) {
            URL.revokeObjectURL(bgObjectUrl);
        }

        bgObjectUrl = URL.createObjectURL(file);
        document.body.style.backgroundImage = `url(${bgObjectUrl})`;
    } catch (e) {
        console.warn("背景加载失败", e);
    }
};

const loadBackground = () => {
    chrome.storage.local.get("bg", ({ bg }) => {
        if (!bg) return;
        applyBackground(bg);
    });
};

// init
set_title();
set_icon();
loadBackground();

themeMedia.addEventListener("change", set_icon);

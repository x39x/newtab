"use strict";

const input = document.getElementById("pick");

input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;

    // 获取扩展私有目录（OPFS）
    const root = await navigator.storage.getDirectory();

    // 创建 / 覆盖背景文件
    const handle = await root.getFileHandle("bg.png", {
        create: true,
    });

    // 写入文件
    const writable = await handle.createWritable();
    await writable.write(file);
    await writable.close();

    // storage 只存文件名
    chrome.storage.local.set({ bg: "bg.png" });

    window.close();
});

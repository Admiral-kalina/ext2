// injerat.js
console.log("injerat.js loaded");

// 1) Inject library.js
const s1 = document.createElement("script");
s1.src = chrome.runtime.getURL("file/library.js");
s1.defer = true;
document.documentElement.appendChild(s1);

const s3 = document.createElement("script");
s3.src = chrome.runtime.getURL("file/fetch/fetch.js");
s3.type = "module";
document.documentElement.appendChild(s3);

const s4 = document.createElement("script");
s4.src = chrome.runtime.getURL("file/helpers/helpers.js");
s4.type = "module";
document.documentElement.appendChild(s4);

// 2) Inject javascript.js
const s2 = document.createElement("script");
s2.src = chrome.runtime.getURL("file/javascript.js");
s2.type = "module";
document.documentElement.appendChild(s2);

// 3) Inject style.css
const linkEl = document.createElement("link");
linkEl.rel = "stylesheet";
linkEl.href = chrome.runtime.getURL("file/style.css");
document.documentElement.appendChild(linkEl);

// 4) Retrieve from chrome.storage and store in window globals
chrome.storage.sync.get("copart", (response) => {
	console.log("copart from storage:", response.copart);
	window.copartData = response.copart;
});

chrome.storage.sync.get("iaai", (response) => {
	console.log("iaai from storage:", response.iaai);
	window.iaaiData = response.iaai;
});

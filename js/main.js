//1 - Handle navigation for mobile devices
const hamburgerBtn = document.querySelector('.hamburger');
const navContent = document.querySelector('.nav-content');

hamburgerBtn.addEventListener('click', () => {
  navContent.classList.toggle('open');
  const ariaToggle = hamburgerBtn.getAttribute("aria-expanded") === "true" ?  "false" : "true";
  hamburgerBtn.setAttribute("aria-expanded", ariaToggle);
})

//2 - handle API and display the url
import getShortenUrl from "./functions/getShortenUrl.js";
import showInputError from "./functions/showInputError.js"

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    showInputError(false);

    if (input.value === '') {
        showInputError(true);
    } else {
        getShortenUrl(input.value);
    }
})

//3 - Display saved url in session storage when refreshing the page
import addNewUrl from "./functions/addNewURL.js";
const savedLinks = document.querySelector('.saved-links');

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('datas') === null) {
        return;
    } else {
        let datas = JSON.parse(sessionStorage.getItem('datas'));
        datas.forEach(data => {
            addNewUrl(data.fullUrl, data.shortenUrl);
        })
    }
})

//Handle copy button
savedLinks.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
        navigator.clipboard.writeText(e.target.value);

        const copyBtns = document.querySelectorAll('.copy-btn');
        copyBtns.forEach(copyBtn => {
            copyBtn.style.backgroundColor = "#2acfcf";
            copyBtn.innerHTML = "Copy";
        })

        e.target.style.backgroundColor = "#3b3054";
        e.target.innerHTML = "Copied!";
    }
})



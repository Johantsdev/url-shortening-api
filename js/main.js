//1 - Handle hamburger button for mobile devices
const hamburgerBtn = document.querySelector('.hamburger');
const navContent = document.querySelector('.nav-content');

hamburgerBtn.addEventListener('click', () => {
  navContent.classList.toggle('open');
  const ariaToggle = hamburgerBtn.getAttribute("aria-expanded") === "true" ?  "false" : "true";
  hamburgerBtn.setAttribute("aria-expanded", ariaToggle);
})

//2 - API
const form = document.querySelector('form');
const input = document.querySelector('input');
const missingLinkMsg = document.querySelector('.missing-link-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.classList.remove('missing-link');
    missingLinkMsg.style.display = 'none';

    if (input.value === '') {
        form.classList.add('missing-link');
        missingLinkMsg.style.display = 'block';
    } else {
        getShortenUrl(input.value);
    }
})

async function getShortenUrl(fullUrl) {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${fullUrl}`);

        if (!res.ok) {
            throw new Error(`${res.status}`);
        }

        const body = await res.json();
        addNewUrl(fullUrl, body["result"].full_short_link);

    } catch (error_code) {
        addNewUrl("Please enter a valid link", "Error");
    }
}

const savedLinks = document.querySelector('.saved-links');
const datas = [];

function addNewUrl(fullUrl, shortenUrl) {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="saved-link">
        <p class="full-version">${fullUrl}</p>
        <div>
            <p class="shorten-version">${shortenUrl}</p>
            <button value=${shortenUrl} class="copy-btn">Copy</button>
        </div>
    </div>     
    `;
    savedLinks.appendChild(div);
    
    let data = {'fullUrl': fullUrl, 'shortenUrl': shortenUrl};
    datas.push(data)
    sessionStorage.setItem('datas', JSON.stringify(datas));
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('datas') === null) {
        return;
    } else {
        let datas = JSON.parse(sessionStorage.getItem('datas'));
        datas.forEach(data => {
            addNewUrl(data.fullUrl, data.shortenUrl)
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



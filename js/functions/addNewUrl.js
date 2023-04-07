import storeDatas from "./storeDatas.js";

const savedLinks = document.querySelector('.saved-links');

export default function addNewUrl(fullUrl, shortenUrl) {    
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
    
    storeDatas(fullUrl, shortenUrl);

}
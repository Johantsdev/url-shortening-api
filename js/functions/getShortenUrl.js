import addNewUrl from "./addNewURL.js";

export default async function getShortenUrl(url) {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);

        if (!res.ok) {
            throw new Error(`${res.status}`);
        }

        const body = await res.json();
        addNewUrl(url, body["result"].full_short_link);

    } catch (error) {
        addNewUrl("Please enter a valid link", ``);
    }
}
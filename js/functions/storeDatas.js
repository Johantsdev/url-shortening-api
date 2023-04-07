const datas = [];

export default function storeDatas(fullUrl, shortenUrl) {
    let data = {'fullUrl': fullUrl, 'shortenUrl': shortenUrl};
    datas.push(data)
    sessionStorage.setItem('datas', JSON.stringify(datas));
}
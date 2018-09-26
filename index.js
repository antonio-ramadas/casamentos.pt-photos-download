const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const got = require('got');

const info = require('./config.json');

const headers = {
    headers: {
        Cookie: info.cookie,
    },
};

function downloadPhotoAndSave(url) {
    const filename = /https:\/\/m\.casamentos\.pt\/web\/wedshoots\/photo\/(\d+)\/0\?download=1/.exec(url)[1];

    got.stream(url, headers).pipe(fs.createWriteStream(`downloads/${filename}.jpg`));
}

function getRequestOptions(partialUrl) {
    return {
        uri: `https://m.casamentos.pt${partialUrl}`,
        transform: body => cheerio.load(body),
        headers: headers.headers,
    };
}

function next(url) {
    console.log(url);
    rp(getRequestOptions(url))
        .then(($) => {
            const photoURL = $('#scrollMobile > div > ul > li > div > div:nth-child(5) > a:nth-child(1)').attr('href');
            downloadPhotoAndSave(photoURL);

            const nextPhoto = $('#app-wedshoots-link-next').attr('href');
            next(nextPhoto);
        })
        .catch((err) => {
            console.error(err);
        });
}

const currentUrl = info.initialUrl;

next(currentUrl);

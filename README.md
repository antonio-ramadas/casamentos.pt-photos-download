# casamentos.pt photos download

> casamentos.pt is a Portuguese website to help the grooms plan the wedding.

## What is it?

When you are given an online album form the website, there is no obvious way to download all the photos. This is one solution for it. It is simple to use, but it is expected some developer knowledge to use this tool.

## I want to use this

### What do I need?

Just [npm](https://www.npmjs.com) to start. Afterwards, clone the repository, grab the terminal and type `npm install` on the directory where the repository is located.

### How do I use it?

You need to do two things after opening the file [config.json](config.json):
 - replace the string of the key `initialUrl` to the link of the first photo of the album you want to download. Also,  drop the following on the link you are about to paste: `https://m.casamentos.pt`.
 - replace the string of the key `cookie` by the cookie of your session (the one sent on each new URL). This is tricky to do if you are not experienced.

Now you are ready to type `npm start` and the photos will appear in the [downloads folder](downloads/).


## On a technical level, how does it work?

The configuration parameter `initialUrl` points to the first photo of the album. The algorithm starts from there. It downloads the HTML and parses it. With it parsed, it selects two buttons: `download photo` and `next photo`.

`download photo` is performed in parallel in a streaming fashion way. So, you can be downloading any number of photos in parallel.
 
 `nextPhoto` repeats this process until the parser eventually breaks (throws an exception), because it hit the last photo. Going to the next photo is sequential.


## Is it production ready?

Short answer, no. Why? This project started for one time only. The album I was presented had about 1000 photos. Downloading one by one was not an option. I can think of ways to improve it, but the trade-off of spending time on that and executing the current code justifies my decision. Nonetheless, I welcome any kind of contribution like creating issues and opening pull requests.

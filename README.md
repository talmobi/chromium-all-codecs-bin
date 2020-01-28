#  chromium-all-codecs-bin
Download a platform compatible Chromium binary that supports all
media codecs that like h264 and aac that are not available in
Chromium by default (due to licensing issues).

refs:
https://chromium.woolyss.com
https://www.reddit.com/r/privacy/comments/6celi9/chromium_websites_safe/dhuwj2g/

## Easy to use

#### Install
```javascript
npm install --save chromium-all-codecs-bin
```

#### Sample Module usage
```javascript
const puppeteer = require( 'puppeteer-core' )
const execPath = require( 'chromium-all-codecs-bin' )
const opts = {
  headless: false, // show browser
  executablePath: execPath
}
;(async function () {
    let browser = await puppeteer.launch( opts )

    const pages = await browser.pages()
    page = pages[ 0 ]

    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/' )
})()
```

## About
Installs woolyss based all-codecs+ Chromium binaries for the
current platform and returns the path to the executable that was
downloaded.

## Why
Chromium by default (that comes with puppeteer, for example)
does not support licensed codecs such as h264 and AAC which
makes it unable to play these media files (e.g. unable to play
certain YouTube videos).

## For who?
Want to play media files in puppeteer?

## How
Basically just copy paste the puppeteer binary download/install
code and replace the url's with woolyss url's for the
all-codecs+ prebuilt binaries.

## Alternatives
`chrome-finder` -- finds installed Chrome executable path.
Chrome by default supports licensed codecs such as h264 and AAC.

## Test
```
```


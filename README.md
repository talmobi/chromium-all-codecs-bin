#  chromium-all-codecs-bin
Download a platform compatible (mac/win32/64) Chromium binary that supports all
media codecs like h264 and aac that are not available in
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
const execPath = require( 'chromium-all-codecs-bin' )()
const opts = {
  headless: false, // show browser
  executablePath: execPath
}
;(async function () {
    let browser = await puppeteer.launch( opts )

    const pages = await browser.pages()
    page = pages[ 0 ]

    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/' )
    // h264 and AAC now supported~
    // ( e.g. some YouTube video's require this for playback )
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
I wanted to play media files that used h264 and/or aac through
puppeteer which its default bundled Chromium wasn't able to do.

## How
Basically mimic the way puppeteer downloads/installs
binaries and replace the url's with woolyss url's for the
all-codecs+ prebuilt binaries.

See: https://chromium.woolyss.com

## Related
[chrome-finder](https://github.com/gwuhaolin/chrome-finder)

[puppeteer](https://github.com/puppeteer/puppeteer)

## Test
No tests...

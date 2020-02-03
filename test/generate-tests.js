// ref: https://tools.woolyss.com/html5-audio-video-tester/

const test = require( 'tape' )

const puppeteer = require( 'puppeteer-core' )

const fs = require( 'fs' )
const path = require( 'path' )

const execPath = require( '../main.js' )()

let scriptBuffer = (`
// ref: https://tools.woolyss.com/html5-audio-video-tester/

const test = require( 'tape' )

const puppeteer = require( 'puppeteer-core' )

const execPath = require( '../main.js' )()
// const execPath = '/Users/mollie/Downloads/Chromium\ 14.app/Contents/MacOS/Chromium'

const opts = {
  headless: true, // show browser
  args: [
    '--disable-gpu',
    '--incognito'
  ],
  executablePath: execPath
}

let browser
let context

async function sleepMs ( ms ) {
  // console.log( 'sleeping: ' + ms )
  return new Promise( function ( resolve ) {
    setTimeout( resolve, ms )
  } )
}

test( 'init browser', async function ( t ) {
  t.plan( 1 )

  browser = await puppeteer.launch( opts )
  t.comment( 'browser launched.' )

  // close default page
  const pages = await browser.pages()
  const page = pages[ 0 ]
  await page.close()
  t.comment( 'default page closed.' )

  context = await browser.createIncognitoBrowserContext()
  t.comment( 'incognito context created.' )

  t.pass()
} )

`)

const opts = {
  headless: true, // show browser
  // slowMo: 250,
  args: [
    '--disable-gpu',
    '--incognito'
  ],
  executablePath: execPath
}

;( async function () {
  let browser = await puppeteer.launch( opts )

  const pages = await browser.pages()
  let page = pages[ 0 ]

  await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/' )

  await page.waitFor( 'footer' )

  console.log( 'page opened' )

  await sleepMs( 1000 )

  const datas = await page.evaluate( function () {
    const els = document.querySelectorAll( 'table > tbody > tr' )

    const datas = []

    for ( let i = 0; i < els.length; i++ ) {
      const el = els[ i ]

      const dot = el.querySelector( ':nth-child(1) > span' )
      const link = el.querySelector( ':nth-child(2) > a' )

      const video = el.querySelector( ':nth-child(3)' )
      const audio = el.querySelector( ':nth-child(4)' )

      const format = el.querySelector( ':nth-child(6)' )

      if ( link && link.href ) {
        const href = link.href
        const text = link.textContent

        const vt = video.innerHTML
          .split( /<.*?>/ ).join( ' ' )
          .split( /\s+/ ).join( ' ' ).trim()

        const at = audio.innerHTML
          .split( /<.*?>/ ).join( ' ' )
          .split( /\s+/ ).join( ' ' ).trim()

        const ft = format.textContent.trim()

        let ext = ft
        if ( !ext ) {
          ext = text.trim().split( '.' ).pop()
        }

        const fn = (
`
test( '.${ ext } | ${ vt } | ${ at }', async function ( t ) {
  const page = await context.newPage()

  page.on( 'error', onError )

  async function onError ( err ) {
    if ( onError.done ) return
    onError.done = true
    await page.close()
    t.fail( 'page crashed' )
    t.end()
  }

  try {
    await page.goto( '${ href }' )

    // wait for video/audio to load
    await page.waitForFunction( function () {
      const video = document.querySelector( 'video' )
      const audio = document.querySelector( 'audio' )

      return video || audio
    } )

    await sleepMs( 500 )
  } catch ( err ) { return onError( err )  /* ignore */ }

  // play video/audio
  await page.evaluate( function () {
    const video = document.querySelector( 'video' )
    const audio = document.querySelector( 'audio' )

    video && video.play()
    audio && audio.play()
  } )

  // wait for video/audio to play for a bit
  await sleepMs( 500 )

  let currentTime = await page.evaluate( function () {
    const video = document.querySelector( 'video' )
    const audio = document.querySelector( 'audio' )

    let currentTime
    if ( video ) currentTime = video.currentTime
    if ( audio ) currentTime = audio.currentTime

    const ct = Number( currentTime )

    return ct
  } )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )

  if ( currentTime <= 0 ) {
    // wait some more
    await sleepMs( 1000 )

    currentTime = await page.evaluate( function () {
      const video = document.querySelector( 'video' )
      const audio = document.querySelector( 'audio' )

      let currentTime
      if ( video ) currentTime = video.currentTime
      if ( audio ) currentTime = audio.currentTime

      const ct = Number( currentTime )
      video && video.pause()
      audio && audio.pause()

      return ct
    } )
  }

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )
`
        )

        datas.push( fn )
      }
    }

    return datas
  } )

  console.log( 'buffering script' )
  datas.forEach( function ( fn ) {
    scriptBuffer += fn
  } )

  scriptBuffer += (
`
test( 'cleanup', async function ( t ) {
  await browser.close()
  t.end()
} )
`
  )

  fs.writeFileSync(
    path.join( __dirname, 'test-runner.js' ),
    scriptBuffer,
    'utf8'
  )
  console.log( 'script written' )

  await page.close()
  await browser.close()
} )()

async function sleepMs ( ms ) {
  console.log( 'sleeping: ' + ms )
  return new Promise( function ( resolve ) {
    setTimeout( resolve, ms )
  } )
}

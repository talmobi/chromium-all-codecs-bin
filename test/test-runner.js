
// ref: https://tools.woolyss.com/html5-audio-video-tester/

const test = require( 'tape' )

const puppeteer = require( 'puppeteer-core' )

const execPath = require( '../main.js' )()
// const execPath = '/Users/mollie/Downloads/Chromium 14.app/Contents/MacOS/Chromium'

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


test( '.ogv | Theora | Vorbis', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://upload.wikimedia.org/wikipedia/commons/d/d0/Caminandes-_Llama_Drama_-_Short_Movie.ogv' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.webm | VP9 | Opus', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7c/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm.720p.vp9.webm' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.webm | VP8 | Vorbis', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.720p.webm' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.webm | AV1 Main@L3.0 | Opus', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://woolyss.com/f/caminandes-1-llama-drama-av1-opus-480p.webm' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.webm | AV1 Main@L2.0 | (no sound)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://github.com/chromium/chromium/raw/master/media/test/data/bear-av1.webm' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp4 | AV1 | (no sound)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=download.opencontent.netflix.com.s3.amazonaws.com/AV1/Chimera/Old/Chimera-AV1-10bit-768x432-1090kbps.mp4' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp4 | H.265/HEVC Main@L3.1 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://woolyss.com/f/caminandes-3-llamigos-x265-aac.mp4' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp4 | H.265/HEVC Main | (no sound)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://www.elecard.com/storage/video/Elecard_about_Tomsk_part2_HEVC_720p.mp4' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp4 | H.264/AVC Baseline@L2.1 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://video.dailymail.co.uk/video/1418450360/2015/02/1418450360_4056782948001_nerdist--1424015378606.mp4' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp4 | H.264/AVC Main@L3.1 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://www.mainconcept.com/fileadmin/user_upload/products/Source_out.mp4' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.m4v | H.264/AVC Baseline@L3.0 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.m2ts | H.264/AVC High@L4 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://www.hdpvrcapture.com/hdpvrcapturev3/samples/20120927_091416.m2ts' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mov | H.264/AVC Main@L3.1 | MP3', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/tears_of_steel_720p.mov' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.3gp | H.263 BaseLine@1.0 | AMR', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=techslides.com/demos/sample-videos/small.3gp' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.avi | MPEG-4 Visual Advanced Simple@L5 | MP3', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://ossguy.com/sita/Sita_Sings_the_Blues_640x360_XviD.avi' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.qt | MPEG-4 Visual Advanced Simple@L3 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://download.blender.org/demo/movies/esign_2_high.qt' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.3gp | MPEG-4 Visual Simple@L1 | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://www.sample-videos.com/video123/3gp/240/big_buck_bunny_240p_1mb.3gp' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.amr |  | AMR', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=techslides.com/demos/samples/sample.amr' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp3 |  | MP3', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=narwakk.free.fr/musiques/Bob/Bob%20Marley%20-%20Roots,%20Rock,%20Reggae.mp3' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.weba |  | Vorbis', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://hpr.dogphilosophy.net/test/weba.weba' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.ogg |  | Vorbis', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://hpr.dogphilosophy.net/test/ogg.ogg' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.oga |  | Vorbis', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=xahlee.info/js/i/s/test.oga' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.opus |  | Opus', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://hpr.dogphilosophy.net/test/opus.opus' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.flac |  | Flac', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://hpr.dogphilosophy.net/test/flac.flac' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.wav |  | Wave', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://hpr.dogphilosophy.net/test/wav.wav' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.m4a |  | AAC lc', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.mp3 |  | MP3 (streaming)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=ice.somafm.com/groovesalad' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.aac |  | AAC (streaming)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://jazz-wr06.ice.infomaniak.ch/jazz-wr06-64.aac' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.opus |  | Opus (streaming)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=ai-radio.org/128.opus' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.gifv |  | (no sound)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://i.imgur.com/f1Y1xzl.gifv' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( '.gifv |  | (no sound)', async function ( t ) {
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
    await page.goto( 'https://tools.woolyss.com/html5-audio-video-tester/?u=https://i.imgur.com/7wPZQ57.gifv' )

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
  await sleepMs( 1000 )

  const currentTime = await page.evaluate( function () {
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

  await page.close()
  // console.log( 'currentTime: ' + currentTime )

  t.ok( !Number.isNaN( currentTime ), 'currentTime is not NaN' )
  t.ok( currentTime > 0, 'currentTime > 0' )
  t.end()
} )

test( 'cleanup', async function ( t ) {
  await browser.close()
  t.end()
} )

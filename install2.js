const downloadURLs = {
  mac: 'https://github.com/macchrome/macstable/releases/download/v79.0.3945.130-r706915-macOS/Chromium.79.0.3945.130.nosync.app.zip',
  win32: 'https://github.com/macchrome/winchrome/releases/download/v79.0.3945.130-r706915-Win64/Ungoogled-Chromium-79.0.3945.130-Polly.Win32.7z',
  win64: 'https://github.com/macchrome/winchrome/releases/download/v79.0.3945.130-r706915-Win64/ungoogled-chromium-79.0.3945.130-1_windows.7z'
}

const os = require( 'os' )
const fs = require( 'fs' )
const path = require( 'path' )

const rimraf = require( 'rimraf' )
const pkgDir = require( 'pkg-dir' )
const extractZip = require( 'extract-zip' )
const { unzip } = require( 'cross-unzip' )
const makeDir = require( 'make-dir' )

const https = require( 'https' )
const http = require( 'http' )

const redstar = require( 'redstar' )

const revision = 706915

main()

async function main () {
  const projectRoot = __dirname
  const downloadRootDirectory = path.join( projectRoot, '.local-chromium-all-codecs' )

  let platform = ''

  const p = os.platform()
  if ( p === 'darwin' ) platform = 'mac'
  else if ( p === 'linux' ) platform = 'linux'
  else if ( p === 'win32' ) {
    platform = os.arch() === 'x64' ? 'win64' : 'win32'
  }

  if ( !platform ) throw new Error( 'Unspported platform: ' + p )

  if ( platform === 'linux' ) {
    console.log()
    console.log( 'See download instruction from here: ' )
    console.log(
      'https://chromium.woolyss.com/#linux'
    )
    return
  }

  let execPath = ''
  let downloadDirectory = downloadRootDirectory
  if ( platform === 'mac' ) {
    downloadDirectory = path.join( downloadRootDirectory, 'mac-' + revision )
    execPath = path.join( downloadRootDirectory, 'mac-' + revision, 'Chromium.app', 'Contents', 'MacOS', 'Chromium' )
  } else if ( platform === 'linux' ) {
    execPath = 'chromium' // global binary installed with package manager
  } else if ( platform === 'win32' ) {
    downloadDirectory = path.join( downloadRootDirectory, 'win32-' + revision )
    const filename = downloadURLs[ 'win32' ].split( '/' ).pop().split( '.' )[ 0 ]
    execPath = path.join( downloadRootDirectory, 'win32-' + revision, filename,'chrome.exe' )
  } else if ( platform === 'win64' ) {
    downloadDirectory = path.join( downloadRootDirectory, 'win64-' + revision )
    const filename = downloadURLs[ 'win64' ].split( '/' ).pop().split( '.' )[ 0 ]
    execPath = path.join( downloadRootDirectory, 'win64-' + revision, filename, 'chrome.exe' )
  } else throw new Error( 'Unspported platform: ' + platform )

  const execPromise = new Promise(function ( resolve ) {
    redstar( path.join( downloadRootDirectory, '**/chrome.exe' ), function ( err, files, dirs ) {
      resolve( files[ 0 ] )
    } )
  })

  execPath = await execPromise

  execPath = path.relative( process.cwd(), execPath )

  console.log( execPath )

  // make sure download directory exists
  makeDir.sync( downloadDirectory )

  try {
    const s = fs.statSync( execPath )
    // exists already, no need to download
    console.log( 'Chromium already exists, no need to download.' )
  } catch ( err ) {
    // doesn't exist, need to download
    console.log( 'need to download' )
    const url = downloadURLs[ platform ]

    download( url )
    function download ( url ) {
      const params = require( 'url' ).parse( url )
      // params.port = 443
      // params.method = 'GET'

      // console.log( params )

      const h = ( params.protocol === 'https:' ) ? https : http

      const destinationPath = path.join( downloadDirectory, `download-${ platform }-${ revision }.zip` )

      let downloadedBytes = 0
      let totalBytes = 0

      console.log( 'downloading...' )
      const req = h.request( params, function ( res ) {
        // handle redirects
        if ( res.statusCode >= 300 && res.statusCode < 400 && res.headers.location ) {
          console.log( '(redirect: ' + res.statusCode + ')' )
          return download( res.headers.location )
        }

        if ( res.statusCode !== 200 ) {
          const error = new Error( `Download failed: server returned code ${ res.statusCode }. URL: ${ url }` )
          // consume response data to free up memory
          res.resume()
          throw error
        }
        console.log( 'res.status: ' + res.statusCode )

        totalBytes = Number( res.headers[ 'content-length' ] )

        const file = fs.createWriteStream( destinationPath )
        file.on( 'finish', onFinish )
        file.on( 'error', onError )
        res.pipe( file )

        res.on( 'data', onData )
      } )

      req.on( 'error', onError )
      req.end()

      function onData ( chunk ) {
        downloadedBytes += chunk.length
        onProgress( downloadedBytes, totalBytes )
      }

      function onFinish () {
        console.log( 'Download Finished! Unzipping...' )

        // unzip
        const zipPath = destinationPath
        unzip(zipPath, downloadDirectory, function ( err ) {
          if ( err ) throw err
          console.log( 'Unzip Success!' )

          try {
            const s = fs.statSync( execPath )
            // exists already, no need to download
            console.log( 'Chromium downloaded successfully!' )
            console.log( 'Chromium: ' + execPath )
          } catch ( err ) {
            // should exist now that we just downloaded it...
            throw new Error( 'Failed to download Chromium' )
          }
        } )
      }

      function onError ( err ) {
        throw err
      }
    }
  }
}

let progressBar = null
let lastDownloadedBytes = 0
function onProgress ( downloadedBytes, totalBytes ) {
  if ( !progressBar ) {
    // initialize progress bar if it doesn't exist
    const ProgressBar = require( 'progress' )
    progressBar = new ProgressBar( `Downloading Chromium r${ revision } - ${ toMegabytes( totalBytes ) } [:bar] :percent :etas `, {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: totalBytes
    } )
  }
  const delta = downloadedBytes - lastDownloadedBytes
  lastDownloadedBytes = downloadedBytes
  progressBar.tick( delta )
}

function toMegabytes ( bytes ) {
  const mb = bytes / 1024 / 1024
  return `${Math.round( mb * 10 ) / 10} Mb`
}

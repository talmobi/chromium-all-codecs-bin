// give bin path to downloaded Chromium
const fs = require( 'fs' )
const path = require( 'path' )
const commandExists = require( 'command-exists' )

let platform = require( './get-platform.js' )

const binPath = fs.readFileSync( path.join( __dirname, 'bin-path.txt' ), 'utf8' )
module.exports = function () {
  if ( platform === 'linux' ) {
    // fallback to user locale stuff if available as the
    // prebuilt binary downloaded for linux is not an
    // all-codec version but a default chromium binary
    if ( commandExists.sync( 'chromium-browser' ) ) {
      return 'chromium-browser'
    }

    if ( commandExists.sync( 'chromium' ) ) {
      return 'chromium'
    }

    if ( commandExists.sync( 'chrome' ) ) {
      return 'chrome'
    }
  }

  return path.relative( process.cwd(), binPath )
}
module.exports.absolute = binPath

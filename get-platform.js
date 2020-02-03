const os = require( 'os' )

let platform = ''

const p = os.platform()

if ( p === 'darwin' ) platform = 'mac'
else if ( p === 'linux' ) platform = 'linux'
else if ( p === 'win32' ) {
  platform = os.arch() === 'x64' ? 'win64' : 'win32'
}

module.exports = platform

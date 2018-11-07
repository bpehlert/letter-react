// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
    // Return prod kets
    module.exports = require('./prod');
} else {
    // Return dev keys
    module.exports = require('./dev');
}


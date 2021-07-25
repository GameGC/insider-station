const path = require('path');

module.exports = {
    entry: {
        app: './src/index'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js'
    }
}

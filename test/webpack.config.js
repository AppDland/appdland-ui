const path = require('path');

module.exports = {
    // ... resto de la configuración
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
        }
    }
} 
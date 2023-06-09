const express = require('express');
const browserSync = require('browser-sync');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

browserSync.init(
    {
        proxy: 'http://localhost:3000',
        files: ['public/**/*.{html,css,js}'],
        browser: 'default',
        port: port+1, // The port that the proxy web server will run on.
        notify: false, // Don't show any notifications in the browser.
        reloadDebounce: 200, // Wait 200ms before reloading so that multiple changes can be collated.
        open: false // Don't open the browser window automatically.
    }
)
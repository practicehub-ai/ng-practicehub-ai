const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/practice-hub-web-app'));

app.get('/*', (req,res) =>
    res.sendFile(path.join(__dirname + '/dist/practice-hub-web-app/index.html')),
);

app.listen(process.env.PORT || 8080);
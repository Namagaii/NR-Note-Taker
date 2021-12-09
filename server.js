const express = require('express');
const path = require('path');
const api = require('./routes/api.js');
// Port number
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static('public'));

//Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

process.on('SIGINT', () => {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)")
    process.exit(0);
});
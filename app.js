/**
 * IMPORT 
 */
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const app = express();
const upload = multer();
let frenchMovies  = [];
const PORT = 3000;
/**
 * MIDDLEWARE
 */
app.use('/public', express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * CONFIG
 */
app.set('views', './views')
app.set('view engine', 'ejs')
app.get('/', ((req, res) => {
    //res.send('Hells00!!!');
    res.render('index');
}))

/*
*REQUEST
*/
app.get('/movies', (req, res) => {
    //res.send('bientot des films ici')
    const title = "Films français des 30 dernières années";
    frenchMovies = [{
            title: 'Amélie poulin',
            year: 2001
        },
        {
            title: 'Buffet froid',
            year: 1979
        },
        {
            title: 'Diner de con',
            year: 1998
        },
        {
            title: 'De rouille et d\'os',
            year: 1998
        }
    ];
    res.render('movies', {movies : frenchMovies, title})
});
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/movies',urlencodedParser ,(req,res)=>{
    console.log('req.body.movietitle',req.body.movietitle);
    console.log('YEAR',req.body.movieyear);
    const newMovie = {title : req.body.movietitle, year : req.body.movietitle}
    frenchMovies = [...frenchMovies,newMovie]
    console.log(frenchMovies);
    
    res.sendStatus(201);
});
//app.get('/movies-details', (req,res)=>{
//res.send('bientot des films ici')
//});

app.get('/movies/add', (req, res) => {
    res.send('formulaire')
});
app.get('/movies/:id', (req, res) => {
    //app.get('/movies/:id/:title', (req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    //  res.send(`film numéro ${id} et ${id2}`);
    res.render('movies-details', {
        movieId: id,
        //        movieTitle:title
    });
});

/**
 * START SERV
 */
app.listen(PORT, () => {
    console.log(`listeninssssg on port ${PORT}`);
});
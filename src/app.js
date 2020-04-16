const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
//App port
const PORT=8585;
//instance of express
const app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/jquery/dist/js')));

// Create `ExpressHandlebars` instance with a default layout.
// const hbs = exphbs.create({
// 	helpers: helpers,

// 	// Uses multiple partials dirs, templates in "shared/templates/" are shared
// 	// with the client-side of the app (see below).
// 	partialsDir: [
// 		"shared/templates/",
// 		"views/partials/",
//    ],
   
// });
// This responds with "Hello World" on the homepage
app.get('/',  (req, res)=> {
   res.render('home', {layout: false});
});
 
// Start server
const server = app.listen(PORT, ()=> {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 });
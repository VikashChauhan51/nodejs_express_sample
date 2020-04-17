const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const process = require('process'); 
//App port
const PORT=8585;
//instance of express
const app = express();

//view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//static resource
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/jquery/dist/js')));

//app set
app.set('trust proxy', 1); // trust first proxy

//middlewares
app.use(cookieParser());
app.use(session({
   genid: function(req) {
      return "121"
    },
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
 }));


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

 process.on('message',msg=>{
   console.log(`Message from master :${msg}`);
 });
 if (require.main === module) {
   // this module was run directly from the command line as in node xxx.js
} else {
   // this module was not run directly from the command line and probably loaded by something else
}
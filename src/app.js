const express = require('express');
//instance of express
const app = express();
//App port
const PORT=8585;
// This responds with "Hello World" on the homepage
app.get('/',  (req, res)=> {
   res.send('Hello GET');
});
 
// Start server
const server = app.listen(PORT, ()=> {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 });
const path = require('path');
const http = require('http');

//const routes = require('./routes')

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

app.engine(
    'hbs',
    expressHbs({
        layoutsDir:'views/layouts/', 
        defaultLayout:'main-layout', 
        extname:'hbs'
    })
);
app.set('view engine', 'hbs'); //hbs -> extensions
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use( (req,res,next) =>{
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).render('404',{pageTitle:'Page Not Found'});
});

app.listen(3000);
// const server = http.createServer(app);

// server.listen(3000);


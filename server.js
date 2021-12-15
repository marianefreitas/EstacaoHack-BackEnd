

// importando express
const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// biblioteca EJS busca por uma pasta views
app.set('view engine', 'ejs');
// app.set('views','./app/views');

// indicando a pasta dos arquivos estaticos
app.use(express.static('./views/public'));  

app.use(session({
    secret:'Dae^u?%6bF%MZhjY',
    resave: false,
    saveUninitialized: false
}))

module.exports = app
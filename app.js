const app = require('./server')

const port = process.env.PORT ||3000;

const db = require('./dbConnection')

// const noticias = require('./mockup');


//acessando através do express
app.get('/', async (req, res) => {
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3')
    
    res.render('home/index', { noticias: result.rows, title: "Home" });
});
app.get('/noticias', async (req, res) => {
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC')
    res.render('noticias/noticias', { noticias: result.rows, title: "Notícias" });
});
app.get('/noticia', async (req, res) => {
    var id = req.query.id
    var result = await db.query('SELECT * FROM noticias WHERE id_noticia=$1', [id])
    res.render('noticias/noticia', { noticia: result.rows[0], title: "Notícia" })
})
app.get('/admin', (req, res) => {

    if (req.session.autorizado) {
        res.render('admin/form_add_noticia', { title: 'Admin', autorizado: req.session.autorizado })
    } else {
        res.render("admin/login", { title: "Login" })
    }

})
app.post('/admin/salvar-noticia', async (req, res) => {
    let { titulo, conteudo } = req.body
    
    await db.query('INSERT INTO noticias (titulo,conteudo) VALUES($1,$2)', [titulo, conteudo], (err, result) => {
        res.redirect('/noticias')
    })
})

app.post('/admin/autenticar', (req, res) => {
    const { usuario, senha } = req.body
    if (usuario == 'root' && senha == 'Mariane') {
        req.session.autorizado = true
    }
    res.redirect('/admin')
})

app.get('/admin/sair',(req,res) =>{
    req.session.destroy((err)=>{
        res.redirect('/admin');
    })
})


app.listen(port, () => {
    console.log(`Escutando na porta ${port} com express!`);
    console.log('Aperte Ctrl + C para sair');
});


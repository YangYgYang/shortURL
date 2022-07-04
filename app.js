//==========server setting
const express = require('express')
const app = express()
const port = 3000


//==========Template engine setting(use handlebars)
// 新版本引入法
const exphbs = require('express-handlebars')
app.set('view engine', 'hbs')
const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('hbs', hbs.engine)


//=========="express@4.17.1","express-handlebars@4.0.2"版本才可這樣使用
// const exphbs = require('express-handlebars')
// app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', 'hbs')


//==========mongoose setting
const mongoose = require('mongoose')
mongoose.connect('shortURL_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true })


//==========router
app.get('/', (req, res) => {
    res.render('index')
})


app.listen(port, () => { console.log(`express is running on http://localhost:${port}`) })
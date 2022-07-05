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

//==========中介軟體
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//=========="express@4.17.1","express-handlebars@4.0.2"版本才可這樣使用
// const exphbs = require('express-handlebars')
// app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', 'hbs')


//==========引入mongoose
require('./config/mongoose')


//==========router
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/shorturl/create', (req, res) => {
    const reqUrl = req.body['url']

})

function shortUrl() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = lowerCaseLetters.toUpperCase()
    const numbers = '1234567890'
    const letter = lowerCaseLetters + upperCaseLetters + numbers
    let result = ''


    for (let i = 1; i < 6; i++) {
        const index = Math.round(Math.random() * letter.length)
        result += letter[index]
    }
    return result
}





app.listen(port, () => { console.log(`express is running on http://localhost:${port}`) })
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
const urlModel = require('./models/urlExample')


//==========router
app.get('/', (req, res) => {
    res.render('index')
})



app.post('/shorturl/create', (req, res) => {
    const reqUrl = req.body['url']
    const data = {
        "long_url": reqUrl,
        "short_url": shortUrl()
    }
    create(res, data)
})

app.get('/:id', (req, res) => {
    // res.send('有進到動態路由')

    urlModel.find({ short_url: req.params.id })
        .lean()
        .then((data) => {
            console.log('data long就是', data[0].long_url)
            res.send(`<script>window.location ="${data[0].long_url}"</script>`)

        })
        .catch(error => {
            console.log(error)
        })
})

function create(res, data) {
    console.log(data)
    urlModel.create(data)
        .then(() => {
            res.render('show', { data: data })
        })
        .catch(error => {
            data.short_url = shortUrl()
            create(res, data)
        })
}

function shortUrl() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = lowerCaseLetters.toUpperCase()
    const numbers = '1234567890'
    const letter = lowerCaseLetters + upperCaseLetters + numbers
    let result = ''
    for (let i = 1; i < 6; i++) {
        const index = Math.round(Math.random() * letter.length - 1)
        result += letter[index]
    }
    return result
}




app.listen(port, () => { console.log(`express is running on http://localhost:${port}`) })
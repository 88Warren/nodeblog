const express = require('express')
const path = require('path')
const ejs = require('ejs')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const app = new express();

const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const expressSession = require('express-session')
const flash = require('connect-flash')

const newPostController = require('./Controllers/newPost')
const homeController = require('./Controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

// mongodb+srv://LMW:<LMWmad25?>@cluster0.kdpvlvk.mongodb.net/?retryWrites=true&w=majority

// my_database is name of database data will be saved into, can be called anything. 
// mongoose.connect('mongodb://127.0.0.1/my_database', {useNewUrlParser: true})

mongoose.connect('mongodb+srv://LMW:LMWmad25@cluster0.ptniuqv.mongodb.net/my_database', {useNewUrlParser: true})

app.set('view engine', 'ejs')

global.loggedIn = null;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(flash())
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

app.use(express.static('public'))

app.get('/', homeController)

app.get('/about', (req,res) =>{
    // res.json({
    //     name: 'Is it working about time?'
    // })
    res.render('about')
});

app.get('/contact', (req,res) =>{
    res.render('contact')
});

app.get('/post/:id',getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
 
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req,res)=>{
    res.render('notfound')
})

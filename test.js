const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://127.0.0.1/my_database', {useNewUrlParser: true}); 

BlogPost.create({
    title: 'The mythbusters guide to saving money on Energy Bils',
    body: 'If you have been here a long time, you might remember when I went on ITV....' 
}, (error, blogpost) =>{
    console.log(error,blogpost)
})
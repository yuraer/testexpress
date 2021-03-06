"use strict";

const express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

const app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

app.get('/main', function (req, res) {
  res.render('main',
  { title : 'Main',
    droids: [
      {"date": "01.01.2018", "value" :"150"},
      {"date": "02.01.2018", "value":"100"},
      {"date": "03.01.2018", "value":"200"}
    ]}
  )
})

app.listen(3000,()=>{
  console.log("Server are running on port 3000");
})
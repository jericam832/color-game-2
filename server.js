'use strict';
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const jsdom = require('jsdom');

//App Configuration
const app = express();
app.use(cors());
app.set("view engine", "ejs");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello World</p>`);

app.use(express.urlencoded({ extended: true })); //access request.body
app.use(express.static(__dirname + '/public/'));
const PORT = process.env.PORT;

//Routes
app.get('/', renderColorGame);

function renderColorGame(req, res) {
  let index = {
    root: __dirname
  }
  res.sendFile('index.html', index);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

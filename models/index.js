const url = require('../config/config').mongoURL
const mongoose = require('mongoose')
const db = {}

db.url = url
db.mongoose = mongoose

module.exports = db
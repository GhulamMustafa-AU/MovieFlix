const express = require('express')
const path = require('path')
const db = require('./models/index')
const routes = require('./routes/routes')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',routes)

db.mongoose.connect(db.url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(err)
})

var port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Server live on http://127.0.0.1:${port}`)
})
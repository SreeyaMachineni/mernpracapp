const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
var cors = require('cors')

connectDB()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*',(req,res)=>
        res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
    )
}

app.use(errorHandler)
app.listen(port,()=> console.log('server started on ',port))
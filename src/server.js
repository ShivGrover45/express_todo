import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app=express()
const PORT= process.env.PORT||8000

//get the file path from the current module
const __filename=fileURLToPath(import.meta.url)
//get the directory name of the file path
const __dirname=dirname(__filename)

app.use(express.json())
//middleware for telling to go to public directory
app.use(express.static(path.join(__dirname,'../public')))



app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'public','index.html'))

})

app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)

app.listen(PORT,()=>{
    console.log(`Server listening on PORT:${PORT}`)
})

//routes
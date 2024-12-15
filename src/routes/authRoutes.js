import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
const authRoutes=express.Router()

authRoutes.post('/register',(req,res)=>{  
    const {username,password}=req.body
    console.log(username,password)

    //encrypting the password using bcrypt library
    const hashedPassword=bcrypt.hashSync(password,6)
    console.log(hashedPassword)

    //new user and password to the database
    try{
        const insertUser=db.prepare(`
            INSERT INTO users (username,password)
            VALUES(?,?)
            `)
        const result=insertUser.run(username,hashedPassword)

        //we got the user now we have a default todo for every user
        const defaultTodo="Hello write your first todo"
        const insertTodo=db.prepare(`
            INTSERT INTO users (user_id,tasks)
            VALUES(?,?)
            `)
            insertTodo.run(result.lastInsertRowid,defaultTodo)

            //create a token 
            const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expires_in:'24h'})
            res.json({token})
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})
res.sendStatus(201)
authRoutes.post('/login',(req,res)=>{
})

export default authRoutes
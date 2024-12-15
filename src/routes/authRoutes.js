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
            INSERT INTO todos (user_id,tasks)
            VALUES(?,?)
            `)
            insertTodo.run(result.lastInsertRowid,defaultTodo)

            //create a token 
            const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'})
            res.json({token})
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})
authRoutes.post('/login',(req,res)=>{

    //we got the user and the password in the database 
    //so now the user will again type the username and password and we will use the check the username in our database and its corresponding password
    //since the password is encrypted during the time of registration so it will not be same as the user just entered 
    //so we have to again encrypt the password and check after that

    const {username,password}=req.body
    
    try{
        const getUser=db.prepare(`
            SELECT * FROM users WHERE username= ?
            `)
            const users=getUser.get(username)

            if(!users){
                return res.status(404).send({message:"User not found"})
            }
            const passwordIsValid=bcrypt.compareSync(password,users.password)
            if(!passwordIsValid){
                return res.send(401).send({message:"Password Invalid"})
            }
            const token=jwt.sign({id:users.id},process.env.JWT_SECRET,{expiresIn:'24h'})
    }
    catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default authRoutes
import express from 'express'

import db from '../db.js'

const todoRoutes=express.Router()

//get todos for logged in users
todoRoutes.get('/',(req,res)=>{})

//create todos for users
todoRoutes.post('/',(req,res)=>{})

//for updating tasks
todoRoutes.put('/:id',(req,res)=>{})

//for deleting tasks
todoRoutes.delete('/:id',(req,res)=>{
})

export default todoRoutes
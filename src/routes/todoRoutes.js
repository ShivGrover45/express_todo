import express from 'express'
import prisma from './prismaClient.js'

const todoRoutes=express.Router()

//get todos for logged in users
todoRoutes.get('/',async (req,res)=>{
    const todos=await prisma.todos.findMany({
        where:{
            user_id:req.userId
        }
    })
    res.json(todos)
})

//create todos for users
todoRoutes.post('/',async (req,res)=>{
    const {tasks}=req.body
    const todo=await prisma.todos.create({
        data:{
            user_id:req.userId,
            tasks,
            completed:0
        }
    })
    res.json(todo)
})

//for updating tasks
todoRoutes.put('/:id',async (req,res)=>{
    const {completed}=req.body
    const {id}=req.params
    const {page}=req.query
    const updatedTodo=await prisma.todos.update({
        where:{
            id:id,
            tasks:tasks,
        },
        data:{
            completed:!!completed
        }
    })
             res.json(updatedTodo)
})

//for deleting tasks
todoRoutes.delete('/:id',async (req,res)=>{
    const {id}=req.params
    const userId=req.userId
    await prisma.todos.delete({
        where:{
            id:parseInt(id),
            user_id:userId
        }
    })
        res.json({message:"Task deleted"})
})

export default todoRoutes
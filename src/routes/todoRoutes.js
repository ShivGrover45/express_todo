import express from 'express'

import db from '../db.js'

const todoRoutes=express.Router()

//get todos for logged in users
todoRoutes.get('/',(req,res)=>{
    const getTodo=db.prepare('SELECT * FROM todos WHERE user_id=?')
    const todos=getTodo.all(req.userId)
    res.json(todos)
})

//create todos for users
todoRoutes.post('/',(req,res)=>{
    const {tasks}=req.body
    const insertTodo=db.prepare(`INSERT INTO todos (user_id,tasks) VALUES (?,?)`)
   const result= insertTodo.run(req.userId,tasks)
    res.json({id: result.lastInsertRowid, tasks, completed:0})
})

//for updating tasks
todoRoutes.put('/:id',(req,res)=>{
    const {completed}=req.body
    const {id}=req.params
    const {page}=req.query
    const updateTodo=db.prepare(`
        UPDATE todos SET completed=? WHERE id=?
        `)
        updateTodo.run(completed,id)
        res.json({message:"Task completed"})
})

//for deleting tasks
todoRoutes.delete('/:id',(req,res)=>{
    const {id}=req.params
    const userId=req.userId
    const deleteTodo=db.prepare(`
        DELETE FROM todos WHERE id=? AND user_id=?
        `)
        deleteTodo.run(id,userId)
        res.json({message:"Task deleted"})
})

export default todoRoutes
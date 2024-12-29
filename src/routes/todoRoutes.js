import express from 'express'
<<<<<<< HEAD
import db from '../db.js'
=======
import prisma from './prismaClient.js'
>>>>>>> 4bafc3e99f5c34dcdcfe09f3eec993dac9aaa90d

const router = express.Router()

<<<<<<< HEAD
// Get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.json({ id: result.lastInsertRowid, task, completed: 0 })
})

// Update a todo
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params
    const { page } = req.query

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updatedTodo.run(completed, id)

    res.json({ message: "Todo completed" })
})

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userId)
    
    res.send({ message: "Todo deleted" })
=======
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
>>>>>>> 4bafc3e99f5c34dcdcfe09f3eec993dac9aaa90d
})

export default router
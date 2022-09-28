const express = require('express');
const router = express.Router();
const Task = require('./models');

router.get('/', async(req, res) => {
    title = "Halaman Index";
    tasks = await Task.findAll();
    
    return res.status(200).render("index",{
        title: title,
        tasks: tasks
    });
});

router.get('/add_todo', (req,res) => {
    return res.status(200).render('add_todo');
});

router.post('/store_todo', async(req,res) => {
    const { content, description } = req.body;

    const newTask = Task.build({
        'content': content,
        'description': description
    });

    try{
        await newTask.save();
        console.log("The data has been saved");
        res.redirect("/");
    }catch(error){
        console.log("Error, the data cannot be saved : ", error);
    }
});

router.get('/todo_edit/:id', async(req, res) => {
    const task = await Task.findOne({
        where: {
            id: req.params.id
        }
    });

    console.log(task);
    return res.status(200).render('edit_todo',{
        task: task
    });
});

router.post("/update_edit/:id", async(req, res) =>{
    const task = await Task.findOne({
        where:{
            id: req.body.id
        }
    });

    await task.set({
        content: req.body.content,
        description: req.body.description,
        // is_complete: true
    });

    console.log(req);

    try{
        await task.save();
        console.log("Task has been updated");
        res.redirect("/");
    }catch(error){
        console.log("Error : ", error);
    }
    
})

router.post("/todo_delete/:id", async(req, res) =>{
    const task = await Task.findOne({
        where:{
            id: req.params.id
        }
    });

    try{
        await task.destroy();
        console.log("Task has been delete");
        res.redirect("/");
    }catch(error){
        console.log("Error: ", error);
    }
})

module.exports = router;
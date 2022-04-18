import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {TaskType} from "./components/Todolist";
import { v1 } from 'uuid';


export type TaskFilterType = 'all' | 'active' | 'completed'

function App() {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title:"CSS", isDone: false},
        {id: v1(), title:"JS", isDone: true},
        {id: v1(), title:"React", isDone: false},
        {id: v1(), title:"Redux", isDone: false},
    ])


//Adding
    function addTasks (newTaskValue: string) {
        let newTask = {id: v1(), title: newTaskValue, isDone: false}
        let newTasksArr = [newTask, ...tasks]
        setTasks(newTasksArr)
    }

//Removing
    function removeTask (id: string) {
        let removeTaskFilteredTasksArr = tasks.filter (tasksObj => tasksObj.id !== id)
        setTasks(removeTaskFilteredTasksArr)
    }

//Checkbox
    function checkBoxChange (taskId: string, checked: boolean) {
        console.log(taskId, checked)
        let task = tasks.find (t => taskId === t.id)
        if (task) {task.isDone = checked}
        setTasks([...tasks])
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask ={removeTask}
                addTasks={addTasks}
                checkBoxChange={checkBoxChange}
                />
        </div>
    );
}

export default App;

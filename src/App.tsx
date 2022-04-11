import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
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
    let [filter, setFilter] = useState<TaskFilterType>('all')
    console.log(tasks)


    function taskFilter (filter: TaskFilterType) {
        // console.log(filter)
        setFilter(filter)
    }

    let filteredTasksArr = tasks
    if (filter === 'completed') {
        filteredTasksArr = tasks.filter(tasksObj => tasksObj.isDone)
    }
    if (filter === 'active') {
        filteredTasksArr = tasks.filter(tasksObj => !tasksObj.isDone )
    }




    function removeTask (id: string) {
        let removeTaskFilteredTasksArr = tasks.filter (tasksObj => tasksObj.id !== id)
        setTasks(removeTaskFilteredTasksArr)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasksArr}
                removeTask ={removeTask}
                taskFilter={taskFilter}
                />
        </div>
    );
}

export default App;

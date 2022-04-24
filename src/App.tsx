import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {TaskType} from "./components/Todolist";
import { v1 } from 'uuid';


export type TaskFilterType = 'all' | 'active' | 'completed'
type TodolistsTypes = {
    id: string,
    title: string,
    filter: TaskFilterType
}

function App() {

//States
    let todolist1Id = v1()
    let todolist2Id = v1()
    let [todolists, setTodolists] = useState<Array<TodolistsTypes>> ([
        {id: todolist1Id, title:"What to learn", filter: 'all'},
        {id: todolist2Id, title:"What to watch", filter: 'completed'}
    ])
    let [allTasksObj, setAllTasksObj] = useState({
        [todolist1Id]: [
            {id: v1(), title:"CSS", isDone: false},
            {id: v1(), title:"JS", isDone: true},
            {id: v1(), title:"React", isDone: false},
            {id: v1(), title:"Redux", isDone: false},
        ],
        [todolist2Id]: [
            {id: v1(), title:"Batman", isDone: false},
            {id: v1(), title:"NBA", isDone: true},
            {id: v1(), title:"It-kamasutra", isDone: false},
        ]
    })

//Adding
    function addTasks (newTaskValue: string, todolistId: string) {
        let newTaskObj = {id: v1(), title: newTaskValue, isDone: false}
        let tasksArr = allTasksObj[todolistId]
        let newTasksArr = [newTaskObj, ...tasksArr]
        allTasksObj[todolistId] = newTasksArr
        setAllTasksObj({...allTasksObj})
    }

//Removing
    function removeTask (taskId: string, todolistId: string) {
        let tasks = allTasksObj[todolistId]
        let removedTaskFilteredArr = tasks.filter(tasksObj => tasksObj.id !== taskId)
        allTasksObj[todolistId] = removedTaskFilteredArr
        setAllTasksObj({...allTasksObj})
    }
    function removeTDL (todolistId: string) {
        let filteredTDLs = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTDLs)
        delete allTasksObj[todolistId]
        setAllTasksObj({...allTasksObj})
    }

//Filter
    const onFilter = (filter: TaskFilterType, todolistId: string) => {
        const currentTodolist = todolists.find(tl => tl.id === todolistId)
        if (currentTodolist) {
            currentTodolist.filter = filter
        }
        setTodolists([...todolists])
    }

//Checkbox
    function checkBoxChange (todolistId: string, taskId: string, checked: boolean) {
        // console.log(taskId, checked)
        let tasksArr = allTasksObj[todolistId]
        let currentTask = tasksArr.find (t => taskId === t.id)
        if (currentTask) {
            currentTask.isDone = checked
            setAllTasksObj({...allTasksObj})
        }
    }

//Elements + Filter
    const todolistElements = todolists.map(tl => {

        let filteredTasksForTodolist = allTasksObj[tl.id]
        if (tl.filter === 'completed') {
            filteredTasksForTodolist = filteredTasksForTodolist.filter(tasksObj => tasksObj.isDone)
        }
        if (tl.filter === 'active') {
            filteredTasksForTodolist = filteredTasksForTodolist.filter(tasksObj => !tasksObj.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={filteredTasksForTodolist}
                removeTask ={removeTask}
                addTasks={addTasks}
                onFilter={onFilter}
                checkBoxChange={checkBoxChange}
                filter={tl.filter}
                removeTDL={removeTDL}
                />
            )
    })

    return (
        <div className="App">
            {todolistElements}
        </div>
    );
}

export default App;

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {TaskType} from "./components/Todolist";
import {v1} from 'uuid';
import todolist from "./components/Todolist";
import classes from "./components/Todolist.module.css";
import AddTDLInput from "./components/AddItemInput/AddItemInput";
import AddItemInput from "./components/AddItemInput/AddItemInput";


export type TaskFilterType = 'all' | 'active' | 'completed'

type TdlsTypes = {
    id: string,
    title: string,
    filter: TaskFilterType
}

function App() {

//States
    let todolist1Id = v1()
    let todolist2Id = v1()

    let [tdls, setTdls] = useState<Array<TdlsTypes>>([
        {id: todolist1Id, title: "What to learn", filter: 'all'},
        {id: todolist2Id, title: "What to watch", filter: 'completed'}
    ])
    let [allTasksObj, setAllTasksObj] = useState({
        [todolist1Id]: [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolist2Id]: [
            {id: v1(), title: "Batman", isDone: false},
            {id: v1(), title: "NBA", isDone: true},
            {id: v1(), title: "It-kamasutra", isDone: false},
        ]
    })
    console.log(allTasksObj)


//Adding
    function addTasks(tdlId: string, newTaskValue: string) {
        let newTaskObj = {id: v1(), title: newTaskValue, isDone: false}
        setAllTasksObj({
                ...allTasksObj,
                [tdlId]: [
                    newTaskObj,
                    ...allTasksObj[tdlId]
                ]
            }
        )
    }
    const addTdl = (newTdlTitle: string) => {
        let newTDLId = v1()
        let newTDL: TdlsTypes = {id: newTDLId, title: newTdlTitle, filter: 'all'}
        setTdls([
            newTDL,
            ...tdls
        ])
        setAllTasksObj({
            ...allTasksObj,
            [newTDLId]: []
            }
        )
    }

//Removing
    function removeTask(tdlId: string, taskId: string) {
        setAllTasksObj({
            ...allTasksObj,
            [tdlId]: allTasksObj[tdlId].filter(task => task.id !== taskId)
        })
    }

    function removeTDL(tdlId: string) {
        setTdls(tdls.filter(tl => tl.id !== tdlId))
    }

//Filter
    const onFilter = (todolistId: string, filter: TaskFilterType) => {
        setTdls(tdls.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

//Checkbox
    const checkBoxChange = (todolistId: string, taskId: string, checked: boolean) => {
        let tasksArr = allTasksObj[todolistId]
        let currentTask = tasksArr.find(t => taskId === t.id)
        if (currentTask) {
            currentTask.isDone = checked
            setAllTasksObj({...allTasksObj})
        }
    }

//Editing
    const spanChange = (todolistId: string, taskId: string, newTitle: string) => {
        let currentTask = allTasksObj[todolistId].find(t => t.id === taskId)
        if(currentTask) {
            currentTask.title = newTitle
            setAllTasksObj({...allTasksObj})
        }
    }
    const tdlTitleSpanChange = (todolistId: string, newTitle: string) => {
        let currentTdl = tdls.find(tdl => tdl.id === todolistId)
        if(currentTdl) {
            currentTdl.title = newTitle
        }
        setTdls([
            ...tdls
        ])
    }

//Elements + Filter
    const tdlsElements = tdls.map(tl => {

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
                tdlId={tl.id}
                tdlTitle={tl.title}
                tasks={filteredTasksForTodolist}
                filter={tl.filter}
                removeTask={removeTask}
                addTasks={addTasks}
                onFilter={onFilter}
                checkBoxChange={checkBoxChange}
                spanChange={spanChange}
                tdlTitleSpanChange={tdlTitleSpanChange}
                removeTDL={removeTDL}
            />
        )
    })

    return (
        <div className="App">
            <div>
                <AddItemInput addItem={addTdl}/>
            </div>
            {tdlsElements}
        </div>
    );
}


export default App;

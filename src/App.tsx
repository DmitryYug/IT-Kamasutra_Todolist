import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from 'uuid';
import AddItemInput from "./components/AddItemInput/AddItemInput";
import {Paper, Container, Grid} from "@mui/material";
import ButtonAppBar from "./components/AppBar/AppBar";
import {AddTdlAC, OnFilterAC, RemoveTdlAC, TdlTitleSpanChangeAC, todolistsReducer} from "./state/todolists-reducer";
import {
    AddTaskAC,
    CheckBoxChangeAC,
    RemoveTaskAC,
    SpanChangeAC,
    tasksReducer,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskFilterType = 'all' | 'active' | 'completed'

export type TdlsTypes = {
    id: string,
    title: string,
    filter: TaskFilterType
}
export type TasksTypes = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TasksTypes>
}

function App() {
    // console.log(store)
//States
//     let todolist1Id = v1()
//     let todolist2Id = v1()

    let tdls = useSelector<AppRootStateType, Array<TdlsTypes>>( state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)
    let dispatch = useDispatch()
    console.log(tasks)
    // let [tdls, tdlsDispatch] = useReducer (todolistsReducer,
    //     [
    //         {id: todolist1Id, title: "What to learn", filter: 'all'},
    //         {id: todolist2Id, title: "What to watch", filter: 'completed'}
    //     ]
    // )
    //
    // let [tasks, tasksDispatch] = useReducer (tasksReducer,
    //     {
    //         [todolist1Id]: [
    //             {id: v1(), title: "CSS", isDone: false},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "React", isDone: true},
    //             {id: v1(), title: "Redux", isDone: false},
    //         ],
    //         [todolist2Id]: [
    //             {id: v1(), title: "Batman", isDone: false},
    //             {id: v1(), title: "NBA", isDone: true},
    //             {id: v1(), title: "It-kamasutra", isDone: false},
    //         ]
    //     })


//Adding
    function addTask (tdlId: string, newTaskValue: string) {
        dispatch(AddTaskAC(tdlId, newTaskValue))
    }

    function addTdl(newTdlTitle: string) {
        // let action = AddTdlAC(newTdlTitle)
        dispatch(AddTdlAC(newTdlTitle))
    }

//Removing
    function removeTask(tdlId: string, taskId: string) {
        dispatch(RemoveTaskAC(tdlId, taskId))
    }

    function removeTDL(tdlId: string) {
        dispatch(RemoveTdlAC(tdlId))
    }

//Filter
    function onFilter(todolistId: string, filter: TaskFilterType) {
        dispatch(OnFilterAC(todolistId, filter))
    }

//Checkbox
    function checkBoxChange(todolistId: string, taskId: string, checked: boolean) {
        dispatch(CheckBoxChangeAC(todolistId, taskId, checked))
    }

//Editing переделать map
    function spanChange(todolistId: string, taskId: string, newTitle: string) {
        dispatch(SpanChangeAC(todolistId, taskId, newTitle))
    }

    function tdlTitleSpanChange(todolistId: string, newTitle: string) {
        dispatch(TdlTitleSpanChangeAC(todolistId, newTitle))
    }

//Elements + Filter
    const tdlsElements = tdls.map(tl => {

        let filteredTasksForTodolist = tasks[tl.id]
        if (tl.filter === 'completed') {
            filteredTasksForTodolist = filteredTasksForTodolist.filter(task => task.isDone)
        }
        if (tl.filter === 'active') {
            filteredTasksForTodolist = filteredTasksForTodolist.filter(task => !task.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}} elevation={10} key={tl.id}>
                    <Todolist
                        key={tl.id}
                        tdlId={tl.id}
                        tdlTitle={tl.title}
                        tasks={filteredTasksForTodolist}
                        filter={tl.filter}
                        removeTask={removeTask}
                        addTasks={addTask}
                        onFilter={onFilter}
                        checkBoxChange={checkBoxChange}
                        spanChange={spanChange}
                        tdlTitleSpanChange={tdlTitleSpanChange}
                        removeTDL={removeTDL}
                    />
                </Paper>
            </Grid>

        )
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <AddItemInput addItem={addTdl}/>
                </Grid>
                <Grid container spacing={3}>
                    {tdlsElements}
                </Grid>
            </Container>
        </div>
    );
}


export default App;

import React, {useReducer} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from 'uuid';
import AddItemInput from "./components/AddItemInput/AddItemInput";
import {Paper, Container, Grid} from "@mui/material";
import ButtonAppBar from "./components/AppBar/AppBar";
import {AddTdlAC, OnFilterAC, RemoveTdlAC, TdlTitleSpanChangeAC, todolistsReducer} from "./reducers/todolists-reducer";
import {AddTaskAC, CheckBoxChangeAC, RemoveTaskAC, SpanChangeAC, tasksReducer} from "./reducers/tasks-reducer";


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


function App() {

//States
    let todolist1Id = v1()
    let todolist2Id = v1()

    let [tdls, tdlsDispatch] = useReducer (todolistsReducer,
        [
            {id: todolist1Id, title: "What to learn", filter: 'all'},
            {id: todolist2Id, title: "What to watch", filter: 'completed'}
        ]
    )

    let [tasks, tasksDispatch] = useReducer (tasksReducer,
        {
            [todolist1Id]: [
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: true},
                {id: v1(), title: "Redux", isDone: false},
            ],
            [todolist2Id]: [
                {id: v1(), title: "Batman", isDone: false},
                {id: v1(), title: "NBA", isDone: true},
                {id: v1(), title: "It-kamasutra", isDone: false},
            ]
        })


//Adding
    function addTask (tdlId: string, newTaskValue: string) {
        tasksDispatch(AddTaskAC(tdlId, newTaskValue))
    }

    function addTdl(newTdlTitle: string) {
        let newTdlId = v1()
        tdlsDispatch(AddTdlAC(newTdlId, newTdlTitle))
        tasksDispatch(AddTdlAC(newTdlId, newTdlTitle))
    }

//Removing
    function removeTask(tdlId: string, taskId: string) {
        tasksDispatch(RemoveTaskAC(tdlId, taskId))
    }

    function removeTDL(tdlId: string) {
        tdlsDispatch(RemoveTdlAC(tdlId))
    }

//Filter
    function onFilter(todolistId: string, filter: TaskFilterType) {
        tdlsDispatch(OnFilterAC(todolistId, filter))
    }

//Checkbox
    function checkBoxChange(todolistId: string, taskId: string, checked: boolean) {
        // let tasksArr = tasks[todolistId]
        // let currentTask = tasksArr.find(t => taskId === t.id)
        // if (currentTask) {
        //     currentTask.isDone = checked
        //     setTasks({...tasks})
        // }
        debugger
        tasksDispatch(CheckBoxChangeAC(todolistId, taskId, checked))
    }

//Editing переделать map
    function spanChange(todolistId: string, taskId: string, newTitle: string) {
        tasksDispatch(SpanChangeAC(todolistId, taskId, newTitle))
    }

    function tdlTitleSpanChange(todolistId: string, newTitle: string) {
        tdlsDispatch(TdlTitleSpanChangeAC(todolistId, newTitle))
    }

//Elements + Filter
    const tdlsElements = tdls.map(tl => {

        let filteredTasksForTodolist = tasks[tl.id]
        if (tl.filter === 'completed') {
            filteredTasksForTodolist = filteredTasksForTodolist.filter(tasksObj => tasksObj.isDone)
        }
        if (tl.filter === 'active') {
            filteredTasksForTodolist = filteredTasksForTodolist.filter(tasksObj => !tasksObj.isDone)
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

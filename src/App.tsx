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

    // let [tdls, setTdls] = useState<Array<TdlsTypes>>([
    //     {id: todolist1Id, title: "What to learn", filter: 'all'},
    //     {id: todolist2Id, title: "What to watch", filter: 'completed'}
    // ])
    // let [tasks, setTasks] = useState({
    //     [todolist1Id]: [
    //         {id: v1(), title: "CSS", isDone: false},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //     ],
    //     [todolist2Id]: [
    //         {id: v1(), title: "Batman", isDone: false},
    //         {id: v1(), title: "NBA", isDone: true},
    //         {id: v1(), title: "It-kamasutra", isDone: false},
    //     ]
    // })


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
                {id: v1(), title: "React", isDone: false},
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
        // let newTaskObj = {id: v1(), title: newTaskValue, isDone: false}
        // setTasks({
        //         ...tasks,
        //         [tdlId]: [
        //             newTaskObj,
        //             ...tasks[tdlId]
        //         ]
        //     }
        // )
        tasksDispatch(AddTaskAC(tdlId, newTaskValue))
    }

    function addTdl(newTdlTitle: string) {
        // let newTDLId = v1()
        // let newTDL: TdlsTypes = {id: newTDLId, title: newTdlTitle, filter: 'all'}
        // setTdls([
        //     newTDL,
        //     ...tdls
        // ])
        // setAllTasksObj({
        //         ...allTasksObj,
        //         [newTDLId]: []
        //     }
        // )
        tdlsDispatch(AddTdlAC(newTdlTitle))

    }

//Removing
    function removeTask(tdlId: string, taskId: string) {
        // setTasks({
        //     ...tasks,
        //     [tdlId]: tasks[tdlId].filter(task => task.id !== taskId)
        // })
        tasksDispatch(RemoveTaskAC(tdlId, taskId))
    }

    function removeTDL(tdlId: string) {
        // setTdls(tdls.filter(tl => tl.id !== tdlId))
        tdlsDispatch(RemoveTdlAC(tdlId))
    }

//Filter
    function onFilter(todolistId: string, filter: TaskFilterType) {
        // setTdls(tdls.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
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
        tasksDispatch(CheckBoxChangeAC(todolistId, taskId, checked))
    }

//Editing переделать map
    function spanChange(todolistId: string, taskId: string, newTitle: string) {
        // let currentTask = tasks[todolistId].find(t => t.id === taskId)
        // if (currentTask) {
        //     currentTask.title = newTitle
        //     setTasks({...tasks})
        // }
        tasksDispatch(SpanChangeAC(todolistId, taskId, newTitle))
    }

    function tdlTitleSpanChange(todolistId: string, newTitle: string) {
        // let currentTdl = tdls.find(tdl => tdl.id === todolistId)
        // if (currentTdl) {
        //     currentTdl.title = newTitle
        // }
        // setTdls([
        //     ...tdls
        // ])
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
            <Grid item>
                <Paper style={{padding: '10px'}} elevation={10}>
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

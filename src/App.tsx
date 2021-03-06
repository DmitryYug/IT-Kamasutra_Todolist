import React, {useCallback} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import AddItemInput from "./components/AddItemInput/AddItemInput";
import {Paper, Container, Grid} from "@mui/material";
import ButtonAppBar from "./components/AppBar/AppBar";
import {AddTdlAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskFilterType = 'all' | 'active' | 'completed'

export type TdlsTypes = {
    id: string,
    title: string,
    filter: TaskFilterType
}
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    console.log('App is called')

// Store
    const tdls = useSelector<AppRootStateType, Array<TdlsTypes>>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)
    const dispatch = useDispatch()

//Callbacks
    const addTdl = useCallback((newTdlTitle: string) => {
        dispatch(AddTdlAC(newTdlTitle))
    }, [dispatch])

//Elements + Filter
    const tdlsElements = tdls.map(tl => {

        let currentTasks = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}} elevation={10} key={tl.id}>
                    <Todolist
                        key={tl.id}
                        tdlId={tl.id}
                        tdlTitle={tl.title}
                        tasks={currentTasks}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>
        )
    })

//Component return
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

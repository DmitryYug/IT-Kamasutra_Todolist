import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "../components/Todolist";
import AddItemInput from "../components/AddItemInput/AddItemInput";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import ButtonAppBar from "../components/AppBar/AppBar";
import {CreateTdlTC, SetTdlsTC, TdlDomainType} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../state/store";
import {TasksStateType} from "../state/tasks-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


function App() {

    const preloaderState = useAppSelector(state => state.app.status)

// Store
    const tdls = useSelector<AppRootStateType, TdlDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(SetTdlsTC())
    }, [])
//Callbacks
    const addTdl = useCallback((newTdlTitle: string) => {
        dispatch(CreateTdlTC(newTdlTitle))
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
                        entityStatus={tl.entityStatus}
                    />
                </Paper>
            </Grid>
        )
    })

//Component return
    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            {preloaderState === 'loading' && <LinearProgress color='secondary'/>}
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

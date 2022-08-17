import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, LinearProgress} from "@mui/material";
import ButtonAppBar from "../components/AppBar/AppBar";
import {useAppDispatch, useAppSelector} from "../state/store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';
import {TodolistPage} from "../components/TodolistPage";
import {InitialiseTC} from "../features/Login/auth-reducer";

function App() {

    const preloaderState = useAppSelector(state => state.app.status)
    const isInitialised = useAppSelector(state => state.auth.isInitialised)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(InitialiseTC())
    }, [])


    if (!isInitialised) {
        return <CircularProgress sx={loaderStyle}/>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>

            {preloaderState === 'loading' && <LinearProgress color='secondary'/>}

            <Routes>
                <Route path={'/IT-Kamasutra_Todolist'} element={<TodolistPage/>}/>
                <Route path={'/login'} element={<Login/>}/>

                <Route path={'/404'} element={<h1>404: Page not found</h1>}/>
                <Route path={'*'} element={<Navigate to='/404'/>}/>
            </Routes>

        </div>
    );
}

const loaderStyle = {position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}

export default App;

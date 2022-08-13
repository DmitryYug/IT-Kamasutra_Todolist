import React from 'react';
import './App.css';
import {LinearProgress} from "@mui/material";
import ButtonAppBar from "../components/AppBar/AppBar";
import {useAppSelector} from "../state/store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login";
import {Route, Routes} from 'react-router-dom';
import {TodolistPage} from "../components/TodolistPage";


function App() {

    const preloaderState = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>

            {preloaderState === 'loading' && <LinearProgress color='secondary'/>}

            <Routes>
                <Route path={'/IT-Kamasutra_Todolist'} element={<TodolistPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<h1>not found</h1>}/>
            </Routes>

        </div>
    );
}


export default App;

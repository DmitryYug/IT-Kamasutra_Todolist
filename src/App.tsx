import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";




function App() {

    let tasks1 = [
        {id: 1, title:"CSS", isDone: false},
        {id: 2, title:"JS", isDone: true},
        {id: 3, title:"React", isDone: false},
    ]
    let tasks2 = [
        {id: 1, title:"Forest Gamp", isDone: true},
        {id: 2, title:"Sovetnik", isDone: true},
        {id: 3, title:"Fury", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Movies" tasks={tasks2}/>
        </div>
    );
}

export default App;

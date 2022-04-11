import React from "react";
import {TaskFilterType} from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    taskFilter: (filter: TaskFilterType) => void
}



export function Todolist(props: PropsType ) {

    const taskElements = props.tasks.map ((tasksObj) => {
            return (
                <li>
                    <input type="checkbox" checked={tasksObj.isDone}/>
                    <span>{tasksObj.title}</span>
                    <button onClick={() => props.removeTask(tasksObj.id)}>х</button>
                </li>
            )
        })



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button onClick={() => {props.taskFilter('all')}}>All</button>
                <button onClick={() => {props.taskFilter('active')}}>Active</button>
                <button onClick={() => {props.taskFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}
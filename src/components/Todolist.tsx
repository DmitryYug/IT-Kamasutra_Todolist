import React, {ChangeEvent, useState} from "react";
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
    addTasks: (newTaskValue: string) => void
}



export function Todolist(props: PropsType ) {

    //Filter
    let [filter, setFilter] = useState<TaskFilterType>('all')

    // const taskFilter = (filter: TaskFilterType) => {
    //     setFilter(filter)
    // }
    let filteredTasks = props.tasks
    if (filter === 'completed') {
        filteredTasks = props.tasks.filter(tasksObj => tasksObj.isDone)
    }
    if (filter === 'active') {
        filteredTasks = props.tasks.filter(tasksObj => !tasksObj.isDone )
    }

    const onFilterHandler = (filter: TaskFilterType) => {
        setFilter(filter)
    }

    //Adding
    let [newTaskValue, setNewTask] = useState('')
    const addTask = () => {
        props.addTasks(newTaskValue)
        setNewTask('')
    }
    const onKeyPressHandler = (e: any) => {
        if (e.key === 'Enter') {
            props.addTasks(newTaskValue)
            setNewTask('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    //Removing
    const onRemoveTask = (tId: string) => {
        props.removeTask(tId)
    }
    const taskElements = filteredTasks.map ((tasksObj) => {
            return (
                <li key={tasksObj.id}>
                    <input type="checkbox" checked={tasksObj.isDone}/>
                    <span>{tasksObj.title}</span>
                    <button onClick={() => onRemoveTask(tasksObj.id)}>х</button>
                </li>
            )
        })

    //JSX
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder='add new task'
                    value={newTaskValue}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}> +</button>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button onClick={() => onFilterHandler('all')}>All</button>
                <button onClick={() => onFilterHandler('active')}>Active</button>
                <button onClick={() => onFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}
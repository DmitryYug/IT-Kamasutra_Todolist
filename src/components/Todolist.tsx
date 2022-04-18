import React, {ChangeEvent, useState} from "react";
import {TaskFilterType} from "../App";
import classes from './Todolist.module.css'

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
    checkBoxChange: (taskId: string, checked: boolean) => void
}


const Todolist: React.FC<PropsType> = (
    {title, tasks, removeTask, addTasks, checkBoxChange}) => {

//States
    let [filter, setFilter] = useState<TaskFilterType>('all')
    let [newTaskValue, setNewTask] = useState('')
    let [error, setError] = useState('')

//Filter
    let filteredTasks = tasks
    if (filter === 'completed') {
        filteredTasks = tasks.filter(tasksObj => tasksObj.isDone)
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(tasksObj => !tasksObj.isDone)
    }

    const onFilterHandler = (filter: TaskFilterType) => {
        setFilter(filter)
    }

//Adding

    const addTaskOnclickHandler = () => {
        if (newTaskValue.trim() === '') {
            setError('! No tasks added !')
            return
        } else {
            setError('')
        }
        addTasks(newTaskValue)
        setNewTask('')
    }
    const onKeyPressHandler = (e: any) => {
        if (e.key === 'Enter') {
            if (newTaskValue.trim() === '') {
                setError('! No tasks added !')
                return
            } else {
                setError('')
            }
            addTasks(newTaskValue)
            setNewTask('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTask(e.currentTarget.value)
    }

//Errors

    const currentClass = error ? classes.error : ''


//Removing
    const onRemoveTask = (tId: string) => {
        removeTask(tId)
    }


//Elements + checkbox
    const taskElements = filteredTasks.map((tasksObj) => {

        const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            checkBoxChange(tasksObj.id, e.currentTarget.checked)
        }

        return (
            <li key={tasksObj.id}>
                <input type="checkbox" checked={tasksObj.isDone} onChange={checkBoxOnChangeHandler}/>
                <span className={tasksObj.isDone ? classes.isDone : ''}>{tasksObj.title}</span>
                <button onClick={() => onRemoveTask(tasksObj.id)}>х</button>
            </li>
        )
    })



//JSX
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    placeholder='add new task'
                    value={newTaskValue}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={currentClass}
                />
                <button onClick={addTaskOnclickHandler}> +</button>
                <div>{error}</div>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button className={filter === 'all' ? classes.activefilter : ''} onClick={() => onFilterHandler('all')}>All</button>
                <button className={filter === 'active' ? classes.activefilter : ''} onClick={() => onFilterHandler('active')}>Active</button>
                <button className={filter === 'completed' ? classes.activefilter : ''} onClick={() => onFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist

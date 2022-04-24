import React, {ChangeEvent, useState} from "react";
import {TaskFilterType} from "../App";
import classes from './Todolist.module.css'

//PropsTypes
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    addTasks: (newTaskValue: string, tlId: string) => void
    onFilter: (filter: TaskFilterType, todolistId: string) => void
    checkBoxChange: (todolistId: string, taskId: string, checked: boolean) => void
    filter: TaskFilterType
    removeTDL: (todolistId: string) => void
}


const Todolist: React.FC<PropsType> = (
    {todolistId,title, tasks, filter ,
        removeTask, onFilter, addTasks, checkBoxChange, removeTDL}) => {

//States
    let [newTaskValue, setNewTask] = useState('')
    let [error, setError] = useState('')

//Filter
    const onFilterHandler = (filter: TaskFilterType) => {
        onFilter(filter, todolistId)
    }

//Adding
    const addTaskOnclickHandler = () => {
        if (newTaskValue.trim() === '') {
            setError('! No tasks added !')
            return
        } else {
            setError('')
        }
        addTasks(newTaskValue, todolistId)
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
            addTasks(newTaskValue, todolistId)
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
    const onRemoveTask = (taskId: string, todolistId: string) => {
        removeTask(taskId, todolistId)
    }
    const onRemoveTDL = () => {
        removeTDL(todolistId)
    }


//Elements + checkbox + removing
    const taskElements = tasks.map((tasksObj) => {

        const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            checkBoxChange(todolistId, tasksObj.id, e.currentTarget.checked)
        }

        return (
            <li key={tasksObj.id}>
                <input type="checkbox" checked={tasksObj.isDone} onChange={checkBoxOnChangeHandler}/>
                <span className={tasksObj.isDone ? classes.isDone : ''}>{tasksObj.title}</span>
                <button onClick={() => onRemoveTask(tasksObj.id, todolistId)}>х</button>
            </li>
        )
    })



//JSX
    return (
        <div>
            <h3>
                {title}
                <button onClick={onRemoveTDL}>x</button>
            </h3>
            <div>
                <input
                    placeholder='add new task'
                    value={newTaskValue}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={currentClass}
                />
                <button onClick={addTaskOnclickHandler}>+</button>
                <div>{error}</div>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button className={filter === 'all' ? classes.activeFilter : ''} onClick={() => onFilterHandler('all')}>All</button>
                <button className={filter === 'active' ? classes.activeFilter : ''} onClick={() => onFilterHandler('active')}>Active</button>
                <button className={filter === 'completed' ? classes.activeFilter : ''} onClick={() => onFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist

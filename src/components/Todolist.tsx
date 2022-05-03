import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {TaskFilterType} from "../App";
import classes from './Todolist.module.css'
import AddItemInput from "./AddItemInput/AddItemInput";
import EditableSpan from "./EditableSpan/EditableSpan";

//PropsTypes
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type PropsType = {
    tdlId: string
    tdlTitle: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    addTasks: (tlId: string, newTaskValue: string) => void
    onFilter: (todolistId: string, filter: TaskFilterType) => void
    checkBoxChange: (todolistId: string, taskId: string, checked: boolean) => void
    spanChange: (todolistId: string, taskId: string, newTitle: string) => void
    tdlTitleSpanChange: (todolistId: string, newTitle: string) => void
    filter: TaskFilterType
    removeTDL: (todolistId: string) => void
}


const Todolist: React.FC<PropsType> = (
    {tdlId,tdlTitle, tasks, filter ,
        removeTask, onFilter, addTasks, checkBoxChange, removeTDL, spanChange, tdlTitleSpanChange}) => {

//Filter
    const onFilterHandler = (filter: TaskFilterType) => {
        onFilter(tdlId, filter)
    }

//Adding
    const onClickAddTask = (taskValue: string) => {
        addTasks(tdlId, taskValue)
    }

//Removing
    const onRemoveTask = (tdlId: string, taskId: string) => {
        removeTask(tdlId, taskId)
    }
    const onRemoveTdl = () => {
        removeTDL(tdlId)
    }

//Editing
    const onChangeTdlTitleHandler = (newTitle: string) => {
        tdlTitleSpanChange(tdlId, newTitle)
    }

    const taskElements = tasks.map((tasksObj) => {
        const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            checkBoxChange(tdlId, tasksObj.id, e.currentTarget.checked)
        }
        const onChangeTitleHandler = (newTitle: string) => {
            spanChange(tdlId, tasksObj.id, newTitle)
        }
        return (
            <li key={tasksObj.id}>
                <input type="checkbox" checked={tasksObj.isDone} onChange={checkBoxOnChangeHandler}/>
                <EditableSpan
                    onChange={(newTitle) => {onChangeTitleHandler(newTitle)}}
                    title={tasksObj.title}
                />
                <button onClick={() => onRemoveTask(tdlId, tasksObj.id)}>х</button>
            </li>
        )
    })


//JSX
    return (
        <div>
            <h3>
                <EditableSpan
                    onChange={(newTitle) => {onChangeTdlTitleHandler(newTitle)}}
                    title={tdlTitle}
                />
                <button onClick={onRemoveTdl}>x</button>
            </h3>
            <AddItemInput addItem={onClickAddTask}/>
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


import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {TaskFilterType} from "../App";
import AddItemInput from "./AddItemInput/AddItemInput";
import EditableSpan from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


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
    {
        tdlId, tdlTitle, tasks, filter,
        removeTask, onFilter, addTasks, checkBoxChange, removeTDL, spanChange,
        tdlTitleSpanChange
    }) => {

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

    const taskElements = tasks?.map((tasksObj) => {
        const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            console.log(e.currentTarget.checked)
            checkBoxChange(tdlId, tasksObj.id, e.currentTarget.checked)
        }
        const onChangeTitleHandler = (newTitle: string) => {
            spanChange(tdlId, tasksObj.id, newTitle)
        }
        return (
            <List>
                <div key={tasksObj.id}>
                    <Checkbox
                        checked={tasksObj.isDone}
                        onChange={checkBoxOnChangeHandler}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                    <EditableSpan
                        onChange={(newTitle) => {
                            onChangeTitleHandler(newTitle)
                        }}
                        title={tasksObj.title}
                    />
                    <IconButton onClick={() => onRemoveTask(tdlId, tasksObj.id)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </div>
            </List>
        )
    })


//JSX
    return (
        <div>
            <h3>
                <EditableSpan
                    onChange={(newTitle) => {
                        onChangeTdlTitleHandler(newTitle)
                    }}
                    title={tdlTitle}
                />
                <IconButton onClick={() => onRemoveTdl()}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemInput
                addItem={onClickAddTask}
            />
            <div>
                {taskElements}
            </div>
            <ButtonGroup aria-label="medium secondary button group">
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => onFilterHandler('all')}>all</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => onFilterHandler('active')}>active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => onFilterHandler('completed')}>completed</Button>
            </ButtonGroup>
        </div>
    )
}

export default Todolist


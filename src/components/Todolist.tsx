import React, {useCallback, useEffect} from "react";
import AddItemInput from "./AddItemInput/AddItemInput";
import EditableSpan from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteTdlTC, OnFilterAC, TaskFilterType, UpdateTdlTitleTC} from "../state/todolists-reducer";
import {AddTaskTC, DeleteTaskTC, SetTasksTC, UpdateTaskTC,} from "../state/tasks-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TasksType} from "../api/app-api";
import {useAppDispatch} from "../state/store";
import {RequestStatusType} from "../app/app-reducer";
import styles from './Todolist.module.css'

//Types
type PropsType = {
    tdlId: string
    tdlTitle: string
    filter: TaskFilterType
    tasks: Array<TasksType>
    entityStatus: RequestStatusType
}

const Todolist: React.FC<PropsType> = React.memo((
    {tdlId, tdlTitle, tasks, filter, entityStatus}) => {

    let dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(SetTasksTC(tdlId))
    }, [])

//Callbacks
    //Filter
    const onFilterHandler = useCallback((filter: TaskFilterType) => {
        dispatch(OnFilterAC(tdlId, filter))
    }, [dispatch, tdlId])

    //Adding
    const onClickAddTask = useCallback((taskValue: string) => {
        dispatch(AddTaskTC(tdlId, taskValue))
    }, [dispatch, tdlId])

    //Removing
    const onRemoveTdl = useCallback(() => {
        dispatch(DeleteTdlTC(tdlId))
    }, [dispatch, tdlId])

    //Editing
    const onChangeTdlTitleHandler = useCallback((newTitle: string) => {
        dispatch(UpdateTdlTitleTC(tdlId, newTitle))
    }, [dispatch, tdlId])

    //Filter
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => task.status !== TaskStatuses.Completed)
    }


//Children callbacks
    const onRemoveTask = (taskId: string,) => {
        dispatch(DeleteTaskTC(tdlId, taskId))
    }
    const checkBoxOnChangeHandler = (taskId: string, value: boolean) => {
        value
            ? dispatch(UpdateTaskTC(tdlId, taskId, {status: TaskStatuses.Completed}))
            : dispatch(UpdateTaskTC(tdlId, taskId, {status: TaskStatuses.New}))
    }
    const onChangeTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(UpdateTaskTC(tdlId, taskId, {title: newTitle}))
    }

//TaskElements
    const taskElements = tasks?.map(t => {
        return (
            <Task
                key={t.id}
                tdlId={tdlId}
                task={t}
                onRemoveTask={onRemoveTask}
                checkBoxOnChangeHandler={checkBoxOnChangeHandler}
                onChangeTitleHandler={onChangeTitleHandler}
            />
        )
    })

//Component return
    return (
        <div className={styles.padding10}>
            <h3>
                <EditableSpan onChange={onChangeTdlTitleHandler} title={tdlTitle}/>
                <IconButton disabled={entityStatus === 'loading'} onClick={() => onRemoveTdl()}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemInput addItem={onClickAddTask}/>
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
})

export default Todolist


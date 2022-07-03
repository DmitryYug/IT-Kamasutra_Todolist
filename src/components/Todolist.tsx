import React, {ChangeEvent, useCallback} from "react";
import {TaskFilterType} from "../App";
import AddItemInput from "./AddItemInput/AddItemInput";
import EditableSpan from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {OnFilterAC, RemoveTdlAC, TdlTitleSpanChangeAC} from "../state/todolists-reducer";
import {AddTaskAC, CheckBoxChangeAC, RemoveTaskAC, SpanChangeAC} from "../state/tasks-reducer";


//PropsTypes
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type PropsType = {
    tdlId: string
    tdlTitle: string
    filter: TaskFilterType
    tasks: Array<TaskType>
}


const Todolist: React.FC<PropsType> = React.memo((
    {
        tdlId,
        tdlTitle,
        tasks,
        filter,
    }) => {

    console.log('TDL is called')
    let dispatch = useDispatch()

//Filter
    const onFilterHandler = (filter: TaskFilterType) => {
        dispatch(OnFilterAC(tdlId, filter))
    }

//Adding
    const onClickAddTask = useCallback((taskValue: string) => {
        dispatch(AddTaskAC(tdlId, taskValue))
    }, [])

//Removing
    const onRemoveTask = (tdlId: string, taskId: string) => {
        dispatch(RemoveTaskAC(tdlId, taskId))
    }
    const onRemoveTdl = () => {
        dispatch(RemoveTdlAC(tdlId))
    }

//Editing
    const onChangeTdlTitleHandler = (newTitle: string) => {
        dispatch(TdlTitleSpanChangeAC(tdlId, newTitle))
    }

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }

    const taskElements = tasks?.map((tasksObj) => {
        const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(CheckBoxChangeAC(tdlId, tasksObj.id, e.currentTarget.checked))
        }
        const onChangeTitleHandler = (newTitle: string) => {
            dispatch(SpanChangeAC(tdlId, tasksObj.id, newTitle))
        }

        return (
            <List key={tasksObj.id}>
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
})

export default Todolist


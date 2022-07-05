import React, {useCallback} from "react";
import {TaskFilterType, TasksTypes} from "../App";
import AddItemInput from "./AddItemInput/AddItemInput";
import EditableSpan from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {OnFilterAC, RemoveTdlAC, TdlTitleSpanChangeAC} from "../state/todolists-reducer";
import {AddTaskAC} from "../state/tasks-reducer";
import {Task} from "./Task/Task";


//PropsTypes
type PropsType = {
    tdlId: string
    tdlTitle: string
    filter: TaskFilterType
    tasks: Array<TasksTypes>
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
    const onFilterHandler = useCallback((filter: TaskFilterType) => {
        dispatch(OnFilterAC(tdlId, filter))
    },[dispatch, tdlId])

//Adding
    const onClickAddTask = useCallback((taskValue: string) => {
        dispatch(AddTaskAC(tdlId, taskValue))
    }, [dispatch, tdlId])

//Removing
    const onRemoveTdl = useCallback(() => {
        dispatch(RemoveTdlAC(tdlId))
    },[dispatch, tdlId])

//Editing
    const onChangeTdlTitleHandler = useCallback((newTitle: string) => {
        dispatch(TdlTitleSpanChangeAC(tdlId, newTitle))
    },[dispatch, tdlId])

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }

    const taskElements = tasks?.map(tasksObj => {
        return (
            <Task
                key={tasksObj.id}
                tdlId={tdlId}
                taskId={tasksObj.id}
                isDone={tasksObj.isDone}
                editedTitle={tasksObj.title}
            />
        )
    })


//JSX
    return (
        <div>
            <h3>
                <EditableSpan
                    onChange={onChangeTdlTitleHandler}
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


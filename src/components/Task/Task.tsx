import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, List} from "@mui/material";
import EditableSpan from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TasksType} from "../../App";

export type TaskPropsType = {
    tdlId: string
    task: TasksType
    onRemoveTask: (taskId: string) => void
    checkBoxOnChangeHandler: (taskId: string, value: boolean) => void
    onChangeTitleHandler: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('TASK is called')
    console.log(props.task)

//Callbacks

    //Dispatch Inside Component
    // let dispatch = useDispatch()
    // const onRemoveTask = useCallback(() => {
    //     dispatch(RemoveTaskAC(props.tdlId, props.taskId))
    // },[dispatch, props.tdlId, props.taskId])
    // const checkBoxOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(CheckBoxChangeAC(props.tdlId, props.taskId, e.currentTarget.checked))
    // },[dispatch, props.tdlId, props.taskId])
    // const onChangeTitleHandler = useCallback((newTitle: string) => {
    //     dispatch(SpanChangeAC(props.tdlId, props.taskId, newTitle))
    // },[dispatch, props.tdlId, props.taskId])

    //Parent callbacks
    const onRemoveTask = () => {
        props.onRemoveTask(props.task.id)
    }
    const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.checkBoxOnChangeHandler(props.task.id, e.currentTarget.checked )
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.onChangeTitleHandler(props.task.id, newTitle)
    }

    return (
        <List>
            <div>
                <Checkbox
                    checked={props.task.isDone}
                    onChange={checkBoxOnChangeHandler}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <EditableSpan
                    onChange={onChangeTitleHandler}
                    title={props.task.title}
                />
                <IconButton onClick={onRemoveTask}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </div>
        </List>
    )
})
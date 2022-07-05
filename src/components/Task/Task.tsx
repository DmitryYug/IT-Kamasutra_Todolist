import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, List} from "@mui/material";
import EditableSpan from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {CheckBoxChangeAC, RemoveTaskAC, SpanChangeAC} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    tdlId: string
    taskId: string
    isDone: boolean
    editedTitle: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('TASK is called')

    let dispatch = useDispatch()

    const onRemoveTask = useCallback(() => {
        dispatch(RemoveTaskAC(props.tdlId, props.taskId))
    },[dispatch, props.tdlId, props.taskId])

    const checkBoxOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(CheckBoxChangeAC(props.tdlId, props.taskId, e.currentTarget.checked))
    },[dispatch, props.tdlId, props.taskId])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(SpanChangeAC(props.tdlId, props.taskId, newTitle))
    },[dispatch, props.tdlId, props.taskId])

    return (
        <List key={props.taskId}>
            <div key={props.taskId}>
                <Checkbox
                    checked={props.isDone}
                    onChange={checkBoxOnChangeHandler}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <EditableSpan
                    onChange={onChangeTitleHandler}
                    title={props.editedTitle}
                />
                <IconButton onClick={onRemoveTask}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </div>
        </List>
    )
})
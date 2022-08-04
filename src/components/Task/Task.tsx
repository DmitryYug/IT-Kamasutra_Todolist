import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, List} from "@mui/material";
import EditableSpan from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TasksType} from "../../api/tasks-api";

export type TaskPropsType = {
    tdlId: string
    task: TasksType
    onRemoveTask: (taskId: string) => void
    checkBoxOnChangeHandler: (taskId: string, value: boolean) => void
    onChangeTitleHandler: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('TASK is called')

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
                    checked={props.task.status === TaskStatuses.Completed}
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
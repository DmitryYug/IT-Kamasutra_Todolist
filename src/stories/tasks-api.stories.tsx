import React, {useEffect, useState} from "react";
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'Tasks API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksApi.getTaskApi()
            .then(res => setState(res.data))
    }, [])
    console.log(state)
    return(
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksApi.createTaskApi()
            .then(res => setState(res.data.data))
    }, [])
    console.log(state)
    return(
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksApi.deleteTaskApi()
            .then(res => setState(res.data))
    }, [])
    console.log(state)
    return(
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksApi.updateTitleTaskApi()
            .then(res => setState(res.data))
    }, [])
    console.log(state)
    return(
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
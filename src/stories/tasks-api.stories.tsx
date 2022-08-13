import React, {useEffect, useState} from "react";
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'Tasks API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'here will be tdl id'
    useEffect(() => {
        tasksApi.getTaskApi(todolistId)
            .then(res => setState(res.data))
    }, [])
    console.log(state)
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'here will be tdl id'
    const title = 'here will be title'
    useEffect(() => {
        tasksApi.createTaskApi(todolistId, title)
            .then(res => setState(res.data.data))
    }, [])
    console.log(state)
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'here will be tdl id'
    const taskId = 'here will be task id'

    useEffect(() => {
        tasksApi.deleteTaskApi(todolistId, taskId)
            .then(res => setState(res.data))
    }, [])
    console.log(state)
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
// export const UpdateTasksTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         tasksApi.updateTitleTaskApi()
//             .then(res => setState(res.data))
//     }, [])
//     console.log(state)
//     return (
//         <div>
//             {JSON.stringify(state)}
//         </div>
//     )
// }
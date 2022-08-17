import React, {useEffect, useState} from "react";
import {appApi} from "../api/app-api";

export default {
    title: 'Tasks API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'here will be tdl id'
    useEffect(() => {
        appApi.getTaskApi(todolistId)
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
        appApi.createTaskApi(todolistId, title)
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
        appApi.deleteTaskApi(todolistId, taskId)
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
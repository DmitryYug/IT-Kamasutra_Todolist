import React from "react";
import {useEffect, useState} from "react";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'Todolists API'
}

type TdlType = {
    id: string
    title: string
    addedDate: string
    order: number
}



// let tdlIdGlobal: string

export const GetTodolists = () => {
    const [state, setState] = useState<TdlType[]>([])
    useEffect(() => {
        todolistApi.getTodolistApi()
            .then(res => setState(res.data))
    }, [])
    const tdls = state.map(tdl => {
        return(
            <div>
                <h2>title: {tdl.title}</h2>
                <p>id: {tdl.id}</p>
                <p>added Date: {tdl.addedDate}</p>
            </div>
        )

    })
    return <div> {tdls} </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolistApi()
            .then(res => setState(res.data.data))
    }, [])
    console.log(state)
    return (
        <div>
            {JSON.stringify(state)}
        </div>)
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.updateTitleTodolistApi()
            .then(res => setState(res.data))
    }, [])
    return (
        <div>
            {JSON.stringify(state)}
        </div>)
}

export const GetFirstTdlId = () => {
    const [tdlId, setTdlId] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolistId(2)
            .then(res => setTdlId(res.id))
    }, [])
    return (
        <div>
            {tdlId}
        </div>)
}
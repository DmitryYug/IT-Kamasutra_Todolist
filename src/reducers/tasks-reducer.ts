import {v1} from "uuid"
import {TasksTypes} from "../App";
import {addTdlACType, removeTdlACType} from "./todolists-reducer";

export type TasksStateType = {
    [key: string]: Array<TasksTypes>
}

type tasksReducerACTypes = addTaskACType
    | removeTaskACType
    | checkBoxChangeACType
    | spanChangeACType
    | addTdlACType
    | removeTdlACType


export const tasksReducer = (state: TasksStateType, action: tasksReducerACTypes) => {
    switch (action.type) {
        case "ADD-TASK": {
            let newTaskObj = {id: v1(), title: action.payload.newTaskValue, isDone: false}
            return ({
                ...state,
                [action.payload.tdlId]: [
                    newTaskObj,
                    ...state[action.payload.tdlId]
                ]
            })
        }
        case "REMOVE-TASK": {
            return ({
                ...state,
                [action.payload.tdlId]: state[action.payload.tdlId].filter(
                    task => task.id !== action.payload.taskId
                )
            })
        }
        case "CHECKBOX-CHANGE": {
            let currentTask = state[action.payload.tdlId].find(task => task.id === action.payload.taskId)
            console.log(currentTask)
            if (currentTask) {
                currentTask.isDone = !action.payload.checked
            }
            return state
        }
        case "SPAN-CHANGE": {
            let currentTask = state[action.payload.tdlId].find(
                task => task.id === action.payload.taskId
            )
            if (currentTask) {
                currentTask.title = action.payload.newTitle
            }
            return state
        }
        case "ADD-TDL": {
            // debugger
            return ({
                ...state,
                [action.payload.newTdlId]: []
            })

        }
        case "REMOVE-TDL": {
            delete state[action.payload.tdlId]
            return state
        }
        default:
            return state
    }
}

type addTaskACType = ReturnType<typeof AddTaskAC>
type removeTaskACType = ReturnType<typeof RemoveTaskAC>
type checkBoxChangeACType = ReturnType<typeof CheckBoxChangeAC>
type spanChangeACType = ReturnType<typeof SpanChangeAC>


export const AddTaskAC = (tdlId: string, newTaskValue: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            tdlId: tdlId,
            newTaskValue: newTaskValue
        }
    } as const
}
export const RemoveTaskAC = (tdlId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            tdlId: tdlId,
            taskId: taskId
        }
    } as const
}
export const CheckBoxChangeAC = (tdlId: string, taskId: string, checked: boolean) => {
    return {
        type: 'CHECKBOX-CHANGE',
        payload: {
            tdlId: tdlId,
            taskId: taskId,
            checked: checked
        }
    } as const
}
export const SpanChangeAC = (tdlId: string, taskId: string, newTitle: string) => {
    return {
        type: 'SPAN-CHANGE',
        payload: {
            tdlId: tdlId,
            taskId: taskId,
            newTitle: newTitle
        }
    } as const
}

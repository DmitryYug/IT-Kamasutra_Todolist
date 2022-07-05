import {v1} from "uuid"
import {TasksStateType} from "../App";
import {addTdlACType, removeTdlACType} from "./todolists-reducer";


type tasksReducerACTypes = addTaskACType
    | removeTaskACType
    | checkBoxChangeACType
    | spanChangeACType
    | addTdlACType
    | removeTdlACType

let initialState: TasksStateType = {
    // [todolist1Id]: [
    //     {id: v1(), title: "CSS", isDone: false},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: true},
    //     {id: v1(), title: "Redux", isDone: false},
    // ],
    // [todolist2Id]: [
    //     {id: v1(), title: "Batman", isDone: false},
    //     {id: v1(), title: "NBA", isDone: true},
    //     {id: v1(), title: "It-kamasutra", isDone: false},
    // ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: tasksReducerACTypes) => {
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
            return {
                ...state,
                [action.payload.taskId]: state[action.payload.tdlId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.checked}
                        : task
                    )
            }
        }
        case "SPAN-CHANGE": {
            return {
                ...state,
                [action.payload.tdlId]: state[action.payload.tdlId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.newTitle}
                        : task
                    )
            }
        }
        case "ADD-TDL": {
            return ({
                ...state,
                [action.payload.newTDLId]: []
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

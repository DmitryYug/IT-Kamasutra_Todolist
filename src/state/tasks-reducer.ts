import {AddTdlAC, RemoveTdlAC, SetTdlsAC} from "./todolists-reducer";
import {tasksApi, TaskStatuses, TasksType} from "../api/tasks-api";
import {AllActionsType, TDispatch} from "./store";

let initialState: TasksStateType = {}

//Types
export type tasksReducerACTypes =
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof CheckBoxChangeAC>
    | ReturnType<typeof SpanChangeAC>
    | ReturnType<typeof AddTdlAC>
    | ReturnType<typeof RemoveTdlAC>
    | ReturnType<typeof SetTdlsAC>
    | ReturnType<typeof SetTasksAC>
export type TasksStateType = { [key: string]: TasksType[] }

export const tasksReducer = (state: TasksStateType = initialState, action: AllActionsType) => {
    switch (action.type) {
        case "ADD-TASK":
            return {...state,
                [action.tdlId]: [
                    action.task,
                    ...state[action.tdlId]
                ]}
        case "REMOVE-TASK":
            return {...state, [action.tdlId]: state[action.tdlId].filter(task => task.id !== action.taskId)}
        case "CHECKBOX-CHANGE":
            return {...state, [action.tdlId]: state[action.tdlId].map(task => task.id === action.taskId
                        ? {...task, status: action.status ? 2 : 1}
                        : task)}
        case "SPAN-CHANGE":
            return {...state, [action.tdlId]: state[action.tdlId].map(task => task.id === action.taskId
                        ? {...task, title: action.newTitle}
                        : task)}
        case "ADD-TDL":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TDL": {
            delete state [action.tdlId]
            return {...state}
        }
        case "SET-TDLS":
            const stateCopy = {...state}
            action.tdlsArr.forEach(tl => {stateCopy[tl.id] = []})
            return stateCopy;
        case "SET-TASKS":
            return {
                ...state,
                [action.tdlId]: action.tasks
            }
        default:
            return state
    }
}

//ActionCreators
export const AddTaskAC = (tdlId: string, task: TasksType) =>
    ({type: 'ADD-TASK', tdlId, task} as const)
export const RemoveTaskAC = (tdlId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', tdlId, taskId} as const)
export const CheckBoxChangeAC = (tdlId: string, taskId: string, status: TaskStatuses) =>
    ({type: 'CHECKBOX-CHANGE', tdlId, taskId, status} as const)
export const SpanChangeAC = (tdlId: string, taskId: string, newTitle: string) =>
    ({type: 'SPAN-CHANGE', tdlId, taskId, newTitle} as const)
export const SetTasksAC = (tdlId: string, tasks: TasksType[]) =>
    ({type: 'SET-TASKS', tdlId, tasks} as const)

//ThunkCreators
export const SetTasksTC = (todolistId: string) => {
    return (dispatch: TDispatch) => {
        tasksApi.getTaskApi(todolistId).then(res =>
            dispatch(SetTasksAC(todolistId, res.data.items))
        )
    }
}
export const DeleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: TDispatch) => {
        tasksApi.deleteTaskApi(todolistId, taskId)
            .then(res => dispatch(RemoveTaskAC(todolistId, taskId))
        )
    }
}
export const AddTaskTC = (todolistId: string, title: string) => {
    return (dispatch: TDispatch) => {
        tasksApi.createTaskApi(todolistId, title)
            .then(res => dispatch(AddTaskAC(todolistId, res.data.data.item))
        )
    }
}
export const ChangeTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: TDispatch) => {
        tasksApi.updateTitleTaskApi(todolistId, taskId, title)
            .then(res => dispatch(SpanChangeAC(todolistId, taskId, title))
        )
    }
}
export const ChangeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: TDispatch) => {
        tasksApi.updateStatusTaskApi(todolistId, taskId, status)
            .then(res => dispatch(CheckBoxChangeAC(todolistId, taskId, status))
        )
    }
}

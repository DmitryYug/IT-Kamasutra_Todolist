import {AddTdlAC, RemoveTdlAC, SetTdlsAC} from "./todolists-reducer";
import {appApi, TaskStatuses, TasksType, TodoTaskPriorities, UpdateTaskModelType} from "../api/app-api";
import {AllActionsType, AppRootStateType, ThunkType} from "./store";
import {AppPreloaderTogglerAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

let initialState: TasksStateType = {}

//Types
type UpdateDomainTaskModelTypes = {
    deadline?: string
    description?: string
    priority?: TodoTaskPriorities
    startDate?: string
    status?: TaskStatuses
    title?: string
}
export type TasksReducerACTypes =
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof CheckBoxChangeAC>
    | ReturnType<typeof SpanChangeAC>
    | ReturnType<typeof AddTdlAC>
    | ReturnType<typeof RemoveTdlAC>
    | ReturnType<typeof SetTdlsAC>
    | ReturnType<typeof SetTasksAC>
    | ReturnType<typeof UpdateTaskAC>

export type TasksStateType = { [key: string]: TasksType[] }

export const tasksReducer = (state: TasksStateType = initialState, action: AllActionsType) => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.tdlId]: [action.task, ...state[action.tdlId]]
            }
        case "REMOVE-TASK":
            return {...state, [action.tdlId]: state[action.tdlId].filter(task => task.id !== action.taskId)}
        case "CHECKBOX-CHANGE":
            return {
                ...state, [action.tdlId]: state[action.tdlId].map(task => task.id === action.taskId
                    ? {...task, status: action.status}
                    : task)
            }
        case "SPAN-CHANGE":
            return {
                ...state, [action.tdlId]: state[action.tdlId].map(task => task.id === action.taskId
                    ? {...task, title: action.newTitle}
                    : task)
            }
        case "ADD-TDL":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TDL": {
            delete state [action.tdlId]
            return {...state}
        }
        case "SET-TDLS":
            const stateCopy = {...state}
            action.tdlsArr.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        case "SET-TASKS":
            return {
                ...state,
                [action.tdlId]: action.tasks
            }
        case "UPDATE-TASK":
            return {
                ...state, [action.tdlId]: state[action.tdlId].map(task => task.id === action.taskId
                    ? {...task, ...action.model}
                    : task)
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

export const UpdateTaskAC = (tdlId: string, taskId: string, model: UpdateDomainTaskModelTypes) =>
    ({type: 'UPDATE-TASK', tdlId, taskId, model} as const)


//ThunkCreators
export const SetTasksTC = (todolistId: string):ThunkType => {
    return (dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        appApi.getTaskApi(todolistId)
            .then(res => {
                    dispatch(AppPreloaderTogglerAC('succeeded'))
                    dispatch(SetTasksAC(todolistId, res.data.items))
                }
            )
            .catch(error => {handleServerNetworkError(error, dispatch)})
    }
}
export const DeleteTaskTC = (todolistId: string, taskId: string): ThunkType => {
    return (dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        appApi.deleteTaskApi(todolistId, taskId)
            .then(res => {
                dispatch(AppPreloaderTogglerAC('succeeded'))
                dispatch(RemoveTaskAC(todolistId, taskId))
            })
            .catch(error => {handleServerNetworkError(error, dispatch)})
    }
}
export const AddTaskTC = (todolistId: string, title: string): ThunkType => {
    return (dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        appApi.createTaskApi(todolistId, title)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(AppPreloaderTogglerAC('succeeded'))
                        dispatch(AddTaskAC(todolistId, res.data.data.item))
                    } else {handleServerAppError(res.data, dispatch)}
                }
            )
            .catch(error => {handleServerNetworkError(error, dispatch)})
    }
}
export const UpdateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelTypes): ThunkType => {
    return (dispatch, getState: () => AppRootStateType) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        const currentTask = getState().tasks[todolistId].find(t => t.id === taskId)
        if (currentTask) {
            const apiModel: UpdateTaskModelType = {
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                status: currentTask.status,
                title: currentTask.title,
                ...domainModel
            }
            appApi.updateTaskApi(todolistId, taskId, apiModel)
                .then(res => {
                    dispatch(AppPreloaderTogglerAC('succeeded'))
                    dispatch(UpdateTaskAC(todolistId, taskId, apiModel))
                })
                .catch(error => {handleServerNetworkError(error, dispatch)})
        }
    }
}



import {AddTdlAC, RemoveTdlAC, SetTdlsAC} from "./todolists-reducer";
import {tasksApi, TaskStatuses, TasksType, TodoTaskPriorities} from "../api/tasks-api";
import {AllActionsType, AppRootStateType, TDispatch} from "./store";
import {UpdateTaskModelType} from "../api/todolist-api";

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
export type tasksReducerACTypes =
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
                [action.tdlId]: [
                    action.task,
                    ...state[action.tdlId]
                ]
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

export const UpdateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelTypes) => {
    return (dispatch: TDispatch, getState: () => AppRootStateType) => {
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
            tasksApi.updateTaskApi(todolistId, taskId, apiModel)
                .then(res => dispatch(UpdateTaskAC(todolistId, taskId, apiModel)))
        }
    }
}



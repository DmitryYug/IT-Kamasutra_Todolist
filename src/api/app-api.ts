import axios from "axios";
import {TaskFilterType, TdlDomainType} from "../state/todolists-reducer";

const apiInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '267eb5ea-7a4b-4607-b2f7-80f6053251ed'
    }
})

//General
export type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}
//todolisTypes
export type TdlsType = {
    addedDate: string,
    id: string,
    title: string,
    order: number,
    filter: TaskFilterType
}
export type UpdateTaskModelType = {
    deadline: string
    description: string
    priority: TodoTaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
}
export enum ResultCode  {
    SUCCESSFULL = 0 ,
    BAD_RESPONSE = 1 ,
    CAPTCHA = 10
}
//tasksTypes
export enum TaskStatuses  {
    New  ,
    InProgress  ,
    Completed,
    Draft
}
export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TasksType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TodoTaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}
type GetTasksResponse = {
    items: TasksType[]
    totalCount: number,
    error: string | null,
}
//auth
export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type MeResponseType = {
    id: string,
    email: string,
    login: string,
}



export const appApi = {
    //Todolists
    getTodolistApi() {
        return apiInstance.get<TdlsType[]>(`/todo-lists`)
    },
    createTodolistApi(title: string) {
        return apiInstance.post<ResponseType<{item: TdlDomainType}>>(`/todo-lists`, {title})
    },
    deleteTodolistApi(tdlId: string) {
        return apiInstance.delete<ResponseType>(`/todo-lists/${tdlId}`)
    },
    updateTitleTodolistApi(tdlId: string, title: string) {
        return apiInstance.put<ResponseType>(`/todo-lists/${tdlId}`, {title})
    },
    getTodolistId(tdlNumber: number) {
        return apiInstance.get('/todo-lists')
            .then(res => res.data[tdlNumber])
    },
    //Tasks
    getTaskApi(todolistId: string) {
        return apiInstance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTaskApi(todolistId: string, title: string) {
        return apiInstance.post<ResponseType<{item: TasksType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTaskApi(todolistId: string, taskId: string) {
        return apiInstance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskApi(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return apiInstance.put<ResponseType<TasksType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    //auth
    login(data: AuthDataType) {
        return apiInstance.post<ResponseType<AuthDataType>>(`/auth/login`, data)
    },
    logout() {
        return apiInstance.delete<ResponseType>(`/auth/login`)
    },
    isAuthMe() {
        return apiInstance.get<ResponseType<MeResponseType>>( '/auth/me')
    }

}
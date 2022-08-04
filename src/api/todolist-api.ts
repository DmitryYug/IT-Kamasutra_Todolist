import axios from "axios";
import {TaskFilterType, TdlDomainType} from "../state/todolists-reducer";
import {TaskStatuses, TodoTaskPriorities} from "./tasks-api";


const apiInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '267eb5ea-7a4b-4607-b2f7-80f6053251ed'
    }
})

//Types
export type TdlsType = {
    addedDate: string,
    id: string,
    title: string,
    order: number,
    filter: TaskFilterType
}
export type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
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

export const todolistApi = {
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
    }
}
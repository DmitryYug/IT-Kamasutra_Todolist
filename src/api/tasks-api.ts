import axios from "axios";


const apiInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '267eb5ea-7a4b-4607-b2f7-80f6053251ed'
    }
})

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
type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}

export const tasksApi = {
    getTaskApi(todolistId: string) {
        return apiInstance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTaskApi(todolistId: string, title: string) {
        return apiInstance.post<ResponseType<{item: TasksType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTaskApi(todolistId: string, taskId: string) {
        return apiInstance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTitleTaskApi(todolistId: string, taskId: string, title: string) {
        return apiInstance.put<ResponseType<{item: TasksType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    updateStatusTaskApi(todolistId: string, taskId: string, status: TaskStatuses) {
        return apiInstance.put<ResponseType<{item: TasksType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {status})
    }

}
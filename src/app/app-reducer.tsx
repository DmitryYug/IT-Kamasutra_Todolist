
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'progress-percent'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState
export type AppPreloaderTogglerType = ReturnType<typeof AppPreloaderTogglerAC>
export type AppErrorTogglerType = ReturnType<typeof AppErrorTogglerAC>
export type AppActionsTypes =
    | AppPreloaderTogglerType
    | AppErrorTogglerType



export const appReducer = (state: InitialStateType = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.value}
        default:
            return state
    }
}

export const AppPreloaderTogglerAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const AppErrorTogglerAC = (value: null | string) => ({type: 'APP/SET-ERROR', value} as const)

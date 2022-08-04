import {
    AppErrorTogglerAC, AppErrorTogglerType,
    AppPreloaderTogglerAC, AppPreloaderTogglerType
} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {ResponseType} from "../api/todolist-api";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(AppErrorTogglerAC(data.messages[0]))
    } else {
        dispatch(AppErrorTogglerAC('Some error occurred'))
    }
    dispatch(AppPreloaderTogglerAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(AppErrorTogglerAC(error.message))
    dispatch(AppPreloaderTogglerAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppErrorTogglerType | AppPreloaderTogglerType>


import {appApi, AuthDataType, ResultCode} from "../../api/app-api";
import {ThunkType} from "../../state/store";
import {AppPreloaderTogglerAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


export type AuthReducerACTypes =
    | ReturnType<typeof LoginAC>
    | ReturnType<typeof InitialiseAppAC>

type AuthReducerStateType = {
    isLoggedIn: boolean,
    isInitialised: boolean
}


let initialState: AuthReducerStateType = {
    isLoggedIn: false,
    isInitialised: false
}


export const authReducer =
    (state: AuthReducerStateType = initialState, action: AuthReducerACTypes): AuthReducerStateType => {
        switch (action.type) {
            case "LOGIN/SET-LOGIN-STATUS":
                return {
                    ...state,
                    isLoggedIn: action.isLoggedIn
                }
            case "LOGIN/APP-INITIALISE":
                return {
                    ...state,
                    isInitialised: action.isInitialised
                }
            default:
                return state
        }
    }

//ActionCreators
export const LoginAC = (isLoggedIn: boolean) => ({type: 'LOGIN/SET-LOGIN-STATUS', isLoggedIn} as const)
export const InitialiseAppAC = (isInitialised: boolean) => ({type: 'LOGIN/APP-INITIALISE', isInitialised} as const)

//TC
export const LoginTC = (data: AuthDataType):ThunkType => {
    return (dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        appApi.login(data)
            .then(res => {
                if (res.data.resultCode === ResultCode.SUCCESSFULL) {
                    dispatch(AppPreloaderTogglerAC('succeeded'))
                    dispatch(LoginAC(true))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const LogoutTC = (): ThunkType => {
    return (dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        appApi.logout()
            .then(res => {
                if (res.data.resultCode === ResultCode.SUCCESSFULL) {
                    dispatch(AppPreloaderTogglerAC('succeeded'))
                    dispatch(LoginAC(false))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const InitialiseTC = ():ThunkType => {
    return (dispatch) => {
        appApi.isAuthMe()
            .then(res => {
                dispatch(InitialiseAppAC(true))
                if (res.data.resultCode === ResultCode.SUCCESSFULL) {
                    dispatch(LoginAC(true))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
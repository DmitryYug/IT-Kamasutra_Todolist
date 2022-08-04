import {ResultCode, TdlsType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AllActionsType} from "./store";
import {AppErrorTogglerAC, AppPreloaderTogglerAC, RequestStatusType} from "../app/app-reducer";
import {AddTaskAC} from "./tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

let initialState: TdlDomainType[] = []

//Types
export type TaskFilterType = 'all' | 'active' | 'completed'
export type todolistACTypes =
    | ReturnType<typeof AddTdlAC>
    | ReturnType<typeof RemoveTdlAC>
    | ReturnType<typeof TdlTitleSpanChangeAC>
    | ReturnType<typeof OnFilterAC>
    | ReturnType<typeof SetTdlsAC>
    | ReturnType<typeof EntityStatusTogglerAC>

export type TdlDomainType = TdlsType & {
    filter: TaskFilterType
    entityStatus: RequestStatusType
}

export const todolistsReducer =
    (state: TdlDomainType[] = initialState, action: AllActionsType): Array<TdlDomainType> => {
        switch (action.type) {
            case 'ADD-TDL':
                return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
            case 'REMOVE-TDL':
                return state.filter(tdl => tdl.id !== action.tdlId)
            case "CHANGE-TODOLIST-TITLE":
                return state.map(tdl => tdl.id === action.tdlId ? {...tdl, title: action.newTdlTitle} : tdl)
            case "ONFILTER":
                return state.map(tdl => tdl.id === action.tdlId ? {...tdl, filter: action.filter} : tdl)
            case "SET-TDLS":
                return action.tdlsArr.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            case "SET-ENTITY-STATUS":
                return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
            default:
                return state
        }
    }

//ActionCreators
export const AddTdlAC = (todolist: TdlDomainType) => ({type: 'ADD-TDL', todolist} as const)
export const RemoveTdlAC = (tdlId: string) => ({type: 'REMOVE-TDL', tdlId} as const)
export const TdlTitleSpanChangeAC = (tdlId: string, newTdlTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    tdlId,
    newTdlTitle
} as const)
export const OnFilterAC = (tdlId: string, filter: TaskFilterType) => ({type: 'ONFILTER', tdlId, filter} as const)
export const SetTdlsAC = (tdlsArr: TdlsType[]) => ({type: 'SET-TDLS', tdlsArr} as const)
export const EntityStatusTogglerAC = (todolistId: string, status: RequestStatusType) => ({
    type: 'SET-ENTITY-STATUS',
    todolistId,
    status
} as const)


//ThunkCreators
export const SetTdlsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        todolistApi.getTodolistApi()
            .then(res => {
                dispatch(AppPreloaderTogglerAC('succeeded'))
                dispatch(SetTdlsAC(res.data))
            })
            .catch(error => {
            dispatch(AppErrorTogglerAC(error.message))
            dispatch(AppPreloaderTogglerAC('failed'))
        })
    }
}
export const DeleteTdlTC = (tdlId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        dispatch(EntityStatusTogglerAC(tdlId, 'loading'))
        todolistApi.deleteTodolistApi(tdlId)
            .then(res => {
                dispatch(AppPreloaderTogglerAC('succeeded'))
                dispatch(EntityStatusTogglerAC(tdlId, 'succeeded'))
                dispatch(RemoveTdlAC(tdlId))
            })
            .catch(error => {
                dispatch(AppErrorTogglerAC(error.message))
                dispatch(AppPreloaderTogglerAC('failed'))
            })
    }
}
export const CreateTdlTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        todolistApi.createTodolistApi(title)
            .then(res => {
                    if (res.data.resultCode === ResultCode.SUCCESSFULL) {
                        dispatch(AppPreloaderTogglerAC('succeeded'))
                        dispatch(AddTdlAC(res.data.data.item))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const UpdateTdlTitleTC = (tdlId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(AppPreloaderTogglerAC('loading'))
        todolistApi.updateTitleTodolistApi(tdlId, title)
            .then(res => {
                dispatch(AppPreloaderTogglerAC('succeeded'))
                dispatch(TdlTitleSpanChangeAC(tdlId, title))
            })
            .catch(error => {handleServerNetworkError(error, dispatch)})
    }
}

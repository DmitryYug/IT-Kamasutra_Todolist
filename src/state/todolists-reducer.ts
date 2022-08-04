import {TdlsType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AllActionsType} from "./store";

let initialState: TdlDomainType[] = []

//Types
export type TaskFilterType = 'all' | 'active' | 'completed'
export type todolistACTypes =
    | ReturnType<typeof AddTdlAC>
    | ReturnType<typeof RemoveTdlAC>
    | ReturnType<typeof TdlTitleSpanChangeAC>
    | ReturnType<typeof OnFilterAC>
    | ReturnType<typeof SetTdlsAC>
export type TdlDomainType = TdlsType & {
    filter: TaskFilterType
}

export const todolistsReducer =
    (state: TdlDomainType[] = initialState, action: AllActionsType): Array<TdlsType> => {
        switch (action.type) {
            case 'ADD-TDL':
                return [
                // {addedDate: '', order: 1, id: action.newTDLId, title: action.newTdlTitle, filter: 'all' as TaskFilterType},
                action.todolist,
                ...state
            ]
            case 'REMOVE-TDL':
                return state.filter(tdl => tdl.id !== action.tdlId)
            case "CHANGE-TODOLIST-TITLE":
                return state.map(tdl => tdl.id === action.tdlId ? {...tdl, title : action.newTdlTitle} : tdl)
            case "ONFILTER":
                return state.map(tdl => tdl.id === action.tdlId ? {...tdl, filter: action.filter} : tdl)
            case "SET-TDLS":
                return action.tdlsArr.map(tl => ({...tl, filter: 'all'}))
            default: return state
        }
    }

//ActionCreators
export const AddTdlAC = (todolist: TdlDomainType) => ({type: 'ADD-TDL', todolist} as const)
export const RemoveTdlAC = (tdlId: string) => ({type: 'REMOVE-TDL', tdlId} as const)
export const TdlTitleSpanChangeAC = (tdlId: string, newTdlTitle: string) => ({type: 'CHANGE-TODOLIST-TITLE', tdlId, newTdlTitle} as const)
export const OnFilterAC = (tdlId: string, filter: TaskFilterType) => ({type: 'ONFILTER', tdlId, filter} as const)
export const SetTdlsAC = (tdlsArr: TdlsType[]) => ({type: 'SET-TDLS', tdlsArr} as const)

//ThunkCreators
export const SetTdlsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodolistApi().then(res => dispatch(SetTdlsAC(res.data)))
    }
}
export const DeleteTdlTC = (tdlId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTodolistApi(tdlId)
            .then(res => dispatch(RemoveTdlAC(tdlId)))
    }
}
export const CreateTdlTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTodolistApi(title)
            .then(res => {dispatch(AddTdlAC(res.data.data.item))})
    }
}
export const UpdateTdlTitleTC = (tdlId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.updateTitleTodolistApi(tdlId, title)
            .then(res => {dispatch(TdlTitleSpanChangeAC(tdlId, title))})
    }
}

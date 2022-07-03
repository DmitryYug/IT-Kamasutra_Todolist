import {v1} from "uuid";
import {TaskFilterType, TdlsTypes} from "../App";

type todolistACTypes = addTdlACType
    | removeTdlACType
    | tdlTitleSpanChangeACType
    | onFilterACType

export const todolist1Id = v1()
export const todolist2Id = v1()

let initialState: Array<TdlsTypes> =  [
        // {id: todolist1Id, title: "What to learn", filter: 'all'},
        // {id: todolist2Id, title: "What to watch", filter: 'completed'}
    ]

export const todolistsReducer =
    (state:Array<TdlsTypes> = initialState, action: todolistACTypes): Array<TdlsTypes> => {
    switch (action.type) {
        case 'ADD-TDL': {
            // let newTDLId = v1()
            let newTDL = {id: action.payload.newTDLId, title: action.payload.newTdlTitle, filter: 'all' as TaskFilterType}
            return [...state, newTDL]
        }
        case 'REMOVE-TDL': {
            return state.filter(tdl => tdl.id !== action.payload.tdlId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            let currentTdl = state.find(tdl => tdl.id === action.payload.tdlId)
            if (currentTdl) {
                currentTdl.title = action.payload.newTdlTitle
            }
            return [...state]
        }
        case "ONFILTER": {
            return state.map(
                tdl => tdl.id === action.payload.tdlId
                    ? {...tdl, filter: action.payload.filter}
                    : tdl
            )
        }
        default:
            return state
    }
}


export type addTdlACType = ReturnType<typeof AddTdlAC>
export type removeTdlACType = ReturnType<typeof RemoveTdlAC>
type tdlTitleSpanChangeACType = ReturnType<typeof TdlTitleSpanChangeAC>
type onFilterACType = ReturnType<typeof OnFilterAC>


export const AddTdlAC = (newTdlTitle: string) => {
    return {
        type: 'ADD-TDL',
        payload: {
            newTDLId: v1(),
            newTdlTitle}
    } as const
}
export const RemoveTdlAC = (tdlId: string) => {
    return {
        type: 'REMOVE-TDL',
        payload: {tdlId}
    } as const
}
export const TdlTitleSpanChangeAC = (tdlId: string, newTdlTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            tdlId: tdlId,
            newTdlTitle: newTdlTitle
        }
    } as const
}
export const OnFilterAC = (tdlId: string, filter: TaskFilterType) => {
    return {
        type: 'ONFILTER',
        payload: {
            tdlId: tdlId,
            filter: filter
        }
    } as const
}
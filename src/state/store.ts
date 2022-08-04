import {AnyAction, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {tasksReducer, tasksReducerACTypes} from "./tasks-reducer";
import {todolistACTypes, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "../app/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export type AllActionsType =
    | tasksReducerACTypes
    | todolistACTypes
    | AppActionsType

export type TDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store: Store<AppRootStateType, AnyAction> & {dispatch: any} = createStore(rootReducer, applyMiddleware(thunk));
export type  AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()

// window.store = store;

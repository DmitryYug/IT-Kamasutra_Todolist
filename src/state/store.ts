import {AnyAction, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {tasksReducer, TasksReducerACTypes} from "./tasks-reducer";
import {TodolistACTypes, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsTypes, appReducer} from "../app/app-reducer";
import {authReducer, AuthReducerACTypes} from "../features/Login/auth-reducer";


export type AllActionsType =
    | TasksReducerACTypes
    | TodolistACTypes
    | AppActionsTypes
    | AuthReducerACTypes
export type  AppRootStateType = ReturnType<typeof rootReducer>
// export type TDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>
export type AppDispatch = typeof store.dispatch
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const store: Store<AppRootStateType, AnyAction> & { dispatch: any } = createStore(rootReducer, applyMiddleware(thunk));
export const useAppDispatch = () => useDispatch<AppDispatch>()

// window.store = store;

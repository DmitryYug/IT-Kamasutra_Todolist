import {AnyAction, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {tasksReducer, tasksReducerACTypes} from "./tasks-reducer";
import {todolistACTypes, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AllActionsType = tasksReducerACTypes | todolistACTypes
export type TDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>
export type AppDispatch = typeof store.dispatch

export const store: Store<AppRootStateType, AnyAction> & {dispatch: any} = createStore(rootReducer, applyMiddleware(thunk));
export type  AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()

// window.store = store;

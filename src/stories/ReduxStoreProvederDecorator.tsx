import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

let initialGlobalStore = {
    tasks: {
        ['todolist1Id']: [
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        ['todolist2Id']: [
            {id: v1(), title: "Batman", isDone: false},
            {id: v1(), title: "NBA", isDone: true},
            {id: v1(), title: "It-kamasutra", isDone: false},
        ]
    },
    todolists: [
        {id: 'todolist1Id', title: "What to learn", filter: 'all'},
        {id: 'todolist2Id', title: "What to watch", filter: 'completed'}
    ]
}


export const storyBookStore = createStore(rootReducer, initialGlobalStore as AppRootStateType);


export const ReduxStoreProvederDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}

// export const Primary = AppTest.bind({});
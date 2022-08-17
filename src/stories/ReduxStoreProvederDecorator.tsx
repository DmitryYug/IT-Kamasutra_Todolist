import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {TaskStatuses, TodoTaskPriorities} from "../api/app-api";
import {appReducer} from "../app/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

let initialGlobalStore = {
    tasks: {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low
            }
        ]
        // ['todolist1Id']: [
        //     {id: v1(), title: "CSS", isDone: false},
        //     {id: v1(), title: "JS", isDone: true},
        //     {id: v1(), title: "React", isDone: true},
        //     {id: v1(), title: "Redux", isDone: false},
        // ],
        // ['todolist2Id']: [
        //     {id: v1(), title: "Batman", isDone: false},
        //     {id: v1(), title: "NBA", isDone: true},
        //     {id: v1(), title: "It-kamasutra", isDone: false},
        // ]
    },
    todolists: [
        {addedDate: '', id: 'todolistId1', title: 'first tdl', order: 1, filter: 'all', entityStatus: 'idle'},
        {addedDate: '', id: 'todolistId2', title: 'second tdl', order: 2, filter: 'all', entityStatus: 'idle'},
    ],
    status: 'idle',
    error: null
}


export const storyBookStore = createStore(rootReducer);


export const ReduxStoreProvederDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}

// export const Primary = AppTest.bind({});
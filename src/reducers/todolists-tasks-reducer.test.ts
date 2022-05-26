import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TdlsTypes} from "../App";
import {AddTdlAC, todolistsReducer} from "./todolists-reducer";

test('ids should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TdlsTypes> = [];

    const action = AddTdlAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)  //  { [newTdlId]: [] }
    const endTodolistsState = todolistsReducer(startTodolistsState, action) // [ {id: newTdlId, title: "new todolist", filter: 'all'}]

    const keys = Object.keys(endTasksState); // [newTdlId]
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newTdlId);
    expect(idFromTodolists).toBe(action.payload.newTdlId);
});


// test('')
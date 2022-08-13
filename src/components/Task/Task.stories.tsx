import React, {useState} from "react";
// import {ComponentStory, ComponentMeta} from '@storybook/react';
// import {action} from "@storybook/addon-actions";
// import {Task, TaskPropsType} from "./Task";
// import {v1} from "uuid";
//
// export default {
//     title: 'Task',
//     component: Task
// } as ComponentMeta<typeof Task>;
//
// const onChangeTitleHandler = action('edited title')
// const onRemoveTask = action('removed id')
// const checkBoxOnChangeHandler = action('status')
//
//
// const Template: ComponentStory<typeof Task> = args => <Task {...args}/>
//
// export const DoneTask = Template.bind({})
// DoneTask.args = {
//     onRemoveTask,
//     checkBoxOnChangeHandler,
//     onChangeTitleHandler,
//     task: {id: '1', title: 'Done task', isDone: true},
//     tdlId: v1()
// }
//
// export const NotDoneTask = Template.bind({})
// NotDoneTask.args = {
//     onRemoveTask,
//     checkBoxOnChangeHandler,
//     onChangeTitleHandler,
//     task: {id: '1', title: 'Not Done task', isDone: false},
//     tdlId: v1()
// }
//
//
// // export const TakTest: ComponentStory<typeof Task> = (props: TaskPropsType) => {
// //     return <>
// //         <Task
// //             {...props}
// //             task={{id: '1', title: 'Done task', isDone: true}}
// //             tdlId={v1()}
// //
// //         />
// //         <Task
// //             {...props}
// //             task={{id: '2', title: 'Not done task', isDone: false}}
// //             tdlId={v1()}
// //         />
// //     </>
// // }
// //
// // TakTest.args = {onRemoveTask, checkBoxOnChangeHandler, onChangeTitleHandler};
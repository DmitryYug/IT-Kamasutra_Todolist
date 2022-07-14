import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from "./App";
import {ReduxStoreProvederDecorator} from "./stories/ReduxStoreProvederDecorator";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProvederDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App/>
export const AppTest = Template.bind({})

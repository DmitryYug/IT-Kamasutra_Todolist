import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AddItemInput from "./AddItemInput";

export default {
    title: 'AddItemInput',
    component: AddItemInput
} as ComponentMeta<typeof AddItemInput>;



const Template: ComponentStory<typeof AddItemInput> = args => <AddItemInput {...args}/>
export const AddItemInputTest = Template.bind({})

AddItemInputTest.args = {
    addItem: action('title')
}




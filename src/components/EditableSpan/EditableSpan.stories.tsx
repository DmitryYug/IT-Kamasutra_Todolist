import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan
} as ComponentMeta<typeof EditableSpan>;


const onChange = action('edited title')

export const EditableSpanTest: ComponentStory<typeof EditableSpan> = (props) => {
    return <>
        <EditableSpan
            title={'Editable span'}
            onChange={onChange}
        />
    </>
}


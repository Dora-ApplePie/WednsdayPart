import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'TODOLIST/Task',
    component: Task,

    args: {
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
    }, //общие аргументы (пропс) для нашей истории

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: '123', isDone: true, title: 'JS'},
    todolistId: 'qwerty',
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: '12345', isDone: false, title: 'React'},
    todolistId: 'asds',
};




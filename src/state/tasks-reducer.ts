import {TasksStateType} from '../App';
import {v1} from "uuid";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    },
}
export type AddTasksActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
        todolistId: string
    },
}

export type ChangeTasksActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string
        isDone: boolean
        todolistId: string
    },
}

export type ChangeTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string
        todolistId: string
        title: string
    },
}

type ActionsType = RemoveTasksActionType | AddTasksActionType | ChangeTasksActionType | ChangeTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId, todolistId
        }
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTasksActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todolistId
        }
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTasksActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId, isDone, todolistId
        }
    }
}

export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): ChangeTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId, todolistId, title
        }
    }
}

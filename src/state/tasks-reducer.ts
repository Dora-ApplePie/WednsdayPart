import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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

type ActionsType =
    RemoveTasksActionType
    | AddTasksActionType
    | ChangeTasksActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {
    "todolistId1": [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    "todolistId2": [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
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
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.title}
                        : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            // const copyState = {...state}
            // delete copyState[action.id]
            // return copyState
            const {[action.id]: [], ...rest} = {...state} //деструктурируем объект стейт на свойства а в другой объект отдаем оставшиеся св-ва
            return rest
        }
        default:
            return state
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

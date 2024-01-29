import { Task, TaskResponse, TodolistDomain } from 'features'
import { IonText } from '@ionic/react'

type Props = {
    tasks: TaskResponse[]
    todolist: TodolistDomain
}

export const Tasks = ({ tasks, todolist }: Props) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => !t.status)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status)
    }

    return (
        <>
            {tasksForTodolist?.map((t) => {
                return <Task key={t.id} task={t} />
            })}
            {!tasks.length && <IonText color={'tertiary'}>Create your first task!</IonText>}
        </>
    )
}

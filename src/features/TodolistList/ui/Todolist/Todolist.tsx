import { memo, useEffect } from 'react'
import { AddItemForm, useActions } from 'common'
import s from './Todolist.module.css'
import { FilterTasksButton, TaskResponse, Tasks, tasksThunks, TodolistDomain, TodolistTitle } from 'features'
import { IonCard } from '@ionic/react'

type Props = {
    tasks: TaskResponse[]
    todolist: TodolistDomain
}

export const Todolist = memo(({ tasks, todolist }: Props) => {
    const { getTasks, addTask } = useActions(tasksThunks)
    const { id, entityStatus } = todolist

    useEffect(() => {
        getTasks(id)
    }, [])

    const addTaskCallback = (title: string) => {
        return addTask({ id, title }).unwrap()
    }

    return (
        <IonCard className={s.todolistWrapper}>
            <TodolistTitle todolist={todolist} />
            <AddItemForm
                addItem={addTaskCallback}
                disabled={entityStatus === 'loading'}
                label={'Enter the name of the task'}
            />
            <Tasks tasks={tasks} todolist={todolist} />
            <FilterTasksButton todolist={todolist} />
        </IonCard>
    )
})

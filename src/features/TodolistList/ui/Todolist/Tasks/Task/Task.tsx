import { memo } from 'react'
import { useAppSelector } from 'app'
import { EditableSpan, TaskStatuses, useActions } from 'common'
import { TaskResponse, tasksThunks } from 'features'
import s from './Task.module.css'
import { IonButton, IonCheckbox, IonIcon } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'

type Props = {
    task: TaskResponse
}

export const Task = memo(({ task }: Props) => {
    const status = useAppSelector((state) => state.app.status)
    const { deleteTask, updateTask } = useActions(tasksThunks)
    const { id, title } = task

    const deleteTaskHandler = () => {
        deleteTask({ id, todolistId: task.todoListId })
    }

    const changeStatusHandler = (e: Event) => {
        const status = (e.currentTarget as HTMLInputElement).checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ todolistId: task.todoListId, model: { status }, id })
    }

    const changeTitleHandler = (title: string) => {
        updateTask({ todolistId: task.todoListId, model: { title }, id })
    }

    return (
        <div key={task.id} className={task.status ? `${s.wrapper} ${s.isDone} ` : `${s.wrapper}`}>
            <IonCheckbox className={s.checkbox} checked={task.status === TaskStatuses.Completed}
                         onIonChange={changeStatusHandler}
                         color="primary" />

            <EditableSpan value={title} callback={changeTitleHandler} />

            <IonButton fill={'clear'} disabled={status === 'loading'} onClick={deleteTaskHandler}>
                <IonIcon color={'tertiary'} size={'medium'} icon={trashOutline}> </IonIcon>
            </IonButton>
        </div>
    )
})

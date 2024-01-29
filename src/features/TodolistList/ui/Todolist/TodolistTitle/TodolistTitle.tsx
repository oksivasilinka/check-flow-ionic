import { EditableSpan, useActions } from 'common'
import { TodolistDomain, todolistsThunks } from 'features'
import s from './TodolistTitle.module.css'
import { IonButton, IonIcon, IonText } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'

type Props = {
    todolist: TodolistDomain
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { removeTodolist, updateTodolistTitle } = useActions(todolistsThunks)
    const { id, entityStatus, title } = todolist

    const removeTodolistHandler = () => {
        removeTodolist({ id })
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle({ id, title })
    }

    return (
        <IonText color="primary" className={s.titleBlock}>
            <EditableSpan title value={title} callback={changeTodolistTitleHandler} />
            <IonButton className={s.iconDelete} fill={'clear'} disabled={entityStatus === 'loading'}
                       onClick={removeTodolistHandler}>
                <IonIcon color={'tertiary'} size={'medium'} icon={closeOutline}> </IonIcon>
            </IonButton>
        </IonText>
    )
}

import { useActions } from 'common'
import { FilterValues, TodolistDomain, todolistsActions } from 'features'
import s from './FilterTasksButton.module.css'
import { IonButton } from '@ionic/react'

type Props = {
    todolist: TodolistDomain
}

export const FilterTasksButton = ({ todolist }: Props) => {
    const { changeTodolistFilter } = useActions(todolistsActions)
    const { id, filter } = todolist

    const changeTodolistFilterHandler = (filter: FilterValues) => {
        changeTodolistFilter({ id, filter })
    }

    return (
        <div className={s.buttonWrapper}>
            <IonButton
                className={s.button}
                title={'All'}
                color={filter === 'all' ? 'primary' : 'secondary'}
                onClick={() => changeTodolistFilterHandler('all')}
            >
                All
            </IonButton>
            <IonButton
                title={'Active'}
                color={filter === 'active' ? 'primary' : 'secondary'}
                onClick={() => changeTodolistFilterHandler('active')}
            >
                Active
            </IonButton>
            <IonButton
                color={filter === 'completed' ? 'primary' : 'secondary'}
                onClick={() => changeTodolistFilterHandler('completed')}
            >
                Completed
            </IonButton>
        </div>
    )
}

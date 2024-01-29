import { useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { AddItemForm, useActions } from 'common'
import { selectIsLoggedIn, selectTasks, selectTodolists, Todolist, todolistsThunks } from 'features'
import { useAppSelector } from 'app'
import s from './TodolistsList.module.css'
import { IonCol, IonContent, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRow } from '@ionic/react'

export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { getTodolists, addTodolist } = useActions(todolistsThunks)

    const infiniteScrollRef = useRef<HTMLIonInfiniteScrollElement>(null)

    useEffect(() => {
        if (isLoggedIn) {
            getTodolists()
        } else {
            return
        }
    }, [])

    const addTodolistCallback = (title: string) => {
        return addTodolist({ title }).unwrap()
    }

    const handleInfiniteScroll = () => {
        infiniteScrollRef.current?.complete()
    }

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return (
        <IonPage className={s.page}>
            <IonContent>
                <IonGrid fixed className={s.wrapper}>
                    <IonRow>
                        <AddItemForm addItem={addTodolistCallback} label={'Enter the name of the list'} />
                    </IonRow>
                    <IonRow>
                        {todolists?.map((tl) => {
                            const allTasks = tasks[tl.id]

                            return (
                                <IonCol key={tl.id}>
                                    <Todolist tasks={allTasks} todolist={tl} />
                                </IonCol>
                            )
                        })}
                    </IonRow>
                </IonGrid>
                <IonInfiniteScroll threshold="100px" ref={infiniteScrollRef} onIonInfinite={handleInfiniteScroll}>
                    <IonInfiniteScrollContent />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    )
}

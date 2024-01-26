import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { authThunks, Login, TodolistsList } from 'features'
import { ErrorSnackbar, useActions } from 'common'
import { Header, Routing, selectIsInitialized, useAppSelector } from 'app'
import s from './App.module.css'
import '@ionic/react/css/core.css'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'

setupIonicReact()


export const App = () => {
    const isInitialized = useAppSelector(selectIsInitialized)
    const { me } = useActions(authThunks)

    useEffect(() => {
        console.log(isInitialized)
        me()
    }, [])

    if (!isInitialized) {
        return (
            <div className={s.CircularProgress}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <IonApp>
            <Header />
            <ErrorSnackbar />
            <Routing />
        </IonApp>
    )
}

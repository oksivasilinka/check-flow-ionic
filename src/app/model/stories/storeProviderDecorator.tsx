import { Provider } from 'react-redux'
import { authSlice, tasksSlice, todolistsSlice } from 'features'
import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from 'app/model/app.slice'
import React, { ReactNode } from 'react'
import { IonApp, IonContent, IonPage } from '@ionic/react'

import '@ionic/react/css/core.css'

import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todolists: todolistsSlice,
        app: appSlice,
        auth: authSlice,
    },
})

type Props  = {
    children: ReactNode
}

const IonWrapper = ({children} : Props) => {
    return (
        <IonApp>
            <IonPage>
                <IonContent>{children}</IonContent>
            </IonPage>
        </IonApp>
    )
}

export const StoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <IonWrapper><Provider store={store}>{storyFn()}</Provider></IonWrapper>
}


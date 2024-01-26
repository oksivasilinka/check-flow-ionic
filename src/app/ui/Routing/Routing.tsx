import { Route } from 'react-router-dom'
import { Login, TodolistsList } from 'features'
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react'

export const Routing = () => {

    return (

        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" component={TodolistsList} />
                <Route path="/login" component={Login} />
            </IonRouterOutlet>
        </IonReactRouter>

    )
}

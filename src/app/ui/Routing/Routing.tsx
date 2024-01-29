import { Route, Switch } from 'react-router-dom'
import { Login, TodolistsList } from 'features'
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react'

export const Routing = () => {

    return (
        <IonReactRouter>
            <IonRouterOutlet>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={TodolistsList} />
            </Switch>
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

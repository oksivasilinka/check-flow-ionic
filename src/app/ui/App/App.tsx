import { useEffect } from 'react'
import { authThunks } from 'features'
import { ErrorSnackbar, Loader, useActions } from 'common'
import { Header, Routing, selectIsInitialized, useAppSelector } from 'app'
import '@ionic/react/css/core.css'
import { IonApp } from '@ionic/react'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'


export const App = () => {
    const isInitialized = useAppSelector(selectIsInitialized)
    const { me } = useActions(authThunks)

    useEffect(() => {
        me()
    }, [])

    if (!isInitialized) {
        return <Loader />
    }

    return (
        <IonApp>
            <Header />
            <ErrorSnackbar />
            <Routing />
        </IonApp>
    )
}

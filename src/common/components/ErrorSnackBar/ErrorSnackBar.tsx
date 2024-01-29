import { appActions, useAppDispatch, useAppSelector } from 'app'
import { selectError } from 'features'
import { SyntheticEvent } from 'react'
import { IonToast } from '@ionic/react'

export const ErrorSnackbar = () => {
    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(appActions.setError({ error: null }))
    }

    if (!error) {
        return null
    }

    return (
        <IonToast
            isOpen={!!error}
            onDidDismiss={handleClose}
            header="Error"
            message={`${error} 😠`}
            buttons={['OK']}
            position={'bottom'} color={'danger'} duration={3000}
        />
    )
}

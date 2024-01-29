import { selectStatus, useAppSelector } from 'app'
import { authThunks, selectIsLoggedIn } from 'features'
import { Loader, useActions } from 'common'
import s from './header.module.css'
import { IonButton, IonHeader, IonText, IonTitle } from '@ionic/react'


export const Header = () => {
    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { logout } = useActions(authThunks)

    const logoutHandler = () => {
        logout()
    }

    return (
        <>
            <IonHeader className={s.header}>
                <IonTitle>
                    <a href={'/'}>
                        <IonText color={'light'}>Check Flow</IonText>
                    </a>
                </IonTitle>

                {isLoggedIn && (
                    <IonButton fill={'clear'} onClick={logoutHandler}>
                        <IonText color={'light'}>LOGOUT</IonText>
                    </IonButton>
                )}
                {!isLoggedIn && (
                    <a href={'/login'} style={{ paddingRight: 20 }}>
                        <IonText color={'light'}>LOGIN</IonText>
                    </a>
                )}
            </IonHeader>
            {status === 'loading' && <Loader />}
        </>
    )
}

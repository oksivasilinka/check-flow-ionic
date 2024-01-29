import { useAppSelector } from 'app'
import { Redirect } from 'react-router-dom'
import { selectIsLoggedIn, useLogin } from 'features'
import s from './Login.module.css'
import { IonButton, IonCheckbox, IonCol, IonGrid, IonInput, IonLabel, IonPage, IonRow, IonText } from '@ionic/react'

export const Login = () => {
    const { formik } = useLogin()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={'/'} />
    }

    return (
        <IonPage className={s.wrapper}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonText>
                            <h3>Enter your email and password. If you don't have an account yet, register{' '}
                                <a
                                    href={'https://social-network.samuraijs.com/'}
                                    style={{ color: '#e91e63' }}
                                    target={'_blank'}
                                >
                                    here
                                </a>
                            </h3>
                        </IonText>

                        <form onSubmit={formik.handleSubmit} className={s.form}>

                            <div className={s.input}>
                                <IonInput
                                    placeholder="Email"
                                    fill="outline"
                                    onIonChange={(e) => formik.setFieldValue('email', e.detail.value)}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <IonText className={s.errorMessage}>{formik.errors.email}</IonText>
                                )}
                            </div>

                            <div className={s.input}>
                                <IonInput
                                    placeholder="Password"
                                    type="password"
                                    fill="outline"
                                    onIonChange={(e) => formik.setFieldValue('password', e.detail.value)}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <IonText className={s.errorMessage}>{formik.errors.password}</IonText>
                                )}
                            </div>

                            <div className={s.checkbox}>
                                <IonCheckbox
                                    checked={formik.values.rememberMe}
                                    onIonChange={(e) => {
                                        const newValue = e.target.checked
                                        formik.setFieldValue('rememberMe', newValue)
                                    }}
                                />
                                <IonLabel>Remember me</IonLabel>
                            </div>

                            <IonButton className={s.button} type={'submit'} color={'primary'}>
                                Login
                            </IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    )
}

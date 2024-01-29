import { KeyboardEvent, memo, useState } from 'react'
import { BaseResponse } from 'common'
import s from './AddItemForm.module.css'
import { IonButton, IonIcon, IonInput, IonText } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
    label: string
}

export const AddItemForm = memo(({ addItem, disabled, label }: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | undefined>(undefined)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title)
                .then(() => {
                    setTitle('')
                })
                .catch((err: BaseResponse) => {
                    if (err?.resultCode) {
                        setError(err.messages[0])
                    }
                })
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (e: Event) => {
        setTitle((e.currentTarget as HTMLInputElement).value)
    }

    const addItemOnKeyDown = (e: KeyboardEvent) => {
        if (error) {
            setError(undefined)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div className={s.inputWrapper}>
            <div className={s.input}>
                <IonInput fill={'outline'}
                          placeholder={label}
                          color={error ? 'danger' : 'primary'}
                          disabled={disabled}
                          value={title}
                          onIonInput={changeItemHandler}
                          onKeyDown={addItemOnKeyDown}
                          errorText={error}
                />
                {!!error && <IonText className={s.error} color={'danger'}>{error}</IonText>}</div>
            <IonButton fill={'clear'} disabled={disabled} onClick={addItemHandler}>
                <IonIcon size={'large'} icon={addCircleOutline}></IonIcon>
            </IonButton>

        </div>
    )
})

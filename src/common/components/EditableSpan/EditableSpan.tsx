import { memo, useState } from 'react'
import { IonInput, IonText } from '@ionic/react'

export type Props = {
    value: string
    callback: (newValue: string) => void
    title?: boolean
}

export const EditableSpan = memo(({ value, callback, title: todolistTitle }: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        callback(title)
    }
    const changeTitle = (e: Event) => {
        const value = (e.currentTarget as HTMLInputElement).value
        setTitle(value)
    }

    return editMode ? (
            <IonInput fill={'outline'} color={'primary'} value={title} onIonInput={changeTitle} onBlur={activateViewMode} />
        ) :
        (
            <IonText color={todolistTitle ? 'primary' : 'dark'}
                     style={{ display: 'grid', wordBreak: 'break-all', alignContent: 'center' }}
                     onDoubleClick={activateEditMode}
            >
                {todolistTitle && <h4>{value}</h4>}
                {!todolistTitle && value}
            </IonText>
        )
})

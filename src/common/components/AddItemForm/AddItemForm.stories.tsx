import type { Meta, StoryObj } from '@storybook/react'
import { KeyboardEvent, useState } from 'react'
import { AddItemForm, BaseResponse } from 'common'
import { IonButton, IonIcon, IonInput, IonText } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'
import s from 'common/components/AddItemForm/AddItemForm.module.css'

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    }
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {}

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
    label: string
}

const AddItemFormError = (args: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | undefined>('Title is required')

    const addItem = () => {
        if (title.trim() !== '') {
            args.addItem(title)
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

    const onChangeHandler = (e: Event) => {
        setTitle((e.currentTarget as HTMLInputElement).value)
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (error) setError(undefined)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div className={s.inputWrapper}>
         <div className={s.input}>
             <IonInput
                 placeholder={args.label}
                 fill={'outline'}
                 color={'danger'}
                 disabled={args.disabled}
                 value={title}
                 onIonInput={onChangeHandler}
                 onKeyDown={onKeyPressHandler}
             />

             {!!error && <IonText className={s.error} color={'danger'}>{error}</IonText>}
         </div>
            <IonButton fill={'clear'} disabled={args.disabled} onClick={addItem}>
                <IonIcon size={'large'} icon={addCircleOutline}></IonIcon>
            </IonButton>
        </div>
    )
}

export const AddItemFormErrorStory: Story = {
    render: (args) => <AddItemFormError addItem={args.addItem} label={'Add task'} />
}

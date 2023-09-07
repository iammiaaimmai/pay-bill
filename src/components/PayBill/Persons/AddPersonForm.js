import { useRef } from 'react'

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Error from '../../UI/Error'

import classes from './AddPersonForm.module.css'

function AddPersonForm({ onSubmit, error, onConfirm }) {
    const personInputRef = useRef()

    const submitHandler = e => {
        e.preventDefault()

        onSubmit(personInputRef.current.value)
        personInputRef.current.value = ''
    }

    return (
        <div className='m-tb'>
            <form
                className={classes.form}
                onSubmit={submitHandler}
            >
                <Input
                    className={classes.expandable}
                    ref={personInputRef}
                    label='Add Person'
                    options={{
                        type: 'text',
                        id: 'name',
                        name: 'name',
                        placeholder: 'Name'
                    }}
                />
                <Button>Add</Button>
            </form>
            {error && (
                <Error
                    message={error}
                    onConfirm={() => onConfirm()}
                />
            )}
        </div>
    )
}

export default AddPersonForm

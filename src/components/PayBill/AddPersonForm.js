import { useRef } from 'react'

import Input from '../UI/Input'
import Button from '../UI/Button'
import Error from '../UI/Error'

import classes from './AddPersonForm.module.css'

function AddPersonForm({ onSubmit, error }) {
    const personInputRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(personInputRef.current.value)
        personInputRef.current.value = ''
    }

    return (
        <div className='m-tb'>
            <form
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Input
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
            {error && <Error message={error} />}
        </div>
    )
}

export default AddPersonForm

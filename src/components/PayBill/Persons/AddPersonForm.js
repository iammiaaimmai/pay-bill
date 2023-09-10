import { useRef, useState } from 'react'

import useHttp from '../../../hooks/use-http'

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Error from '../../UI/Error'

import classes from './AddPersonForm.module.css'

const URL = 'https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users'
const NAME_REGEX = /^[a-zA-Z0-9\s]*$/g

function AddPersonForm({ options, onSubmit }) {
    const personInputRef = useRef()
    const [submitError, setSubmitError] = useState(null)

    const { error: fetchError, isLoading, sendReq, removeError: removeFetchError } = useHttp()

    const submitHandler = e => {
        e.preventDefault()

        setSubmitError(null)
        removeFetchError()

        const enteredName = personInputRef.current.value
        const isEnteredNameInvalid = !enteredName.match(NAME_REGEX) || enteredName.trim().length < 3
        const isExistingPerson = options.some(option => option.label.toLowerCase() === enteredName.toLowerCase())

        if (isEnteredNameInvalid || isExistingPerson) {
            setSubmitError(isEnteredNameInvalid
                ? 'Invalid Name'
                : 'User has already been added.'
            )
            return
        }

        if (!isExistingPerson) {
            const applyData = data => {
                const [first] = data
                const personData = { name: enteredName }

                personData.iban =
                    first && first.name.toLowerCase() === enteredName.toLowerCase()
                        ? first.iban
                        : null

                onSubmit(personData)
                personInputRef.current.value = ''
            }

            sendReq({
                url: `${URL}?name=${enteredName}`,
                options: {
                    headers: { 'Content-Type': 'application/json' },
                }
            }, applyData)
        }
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
            {submitError && (
                <Error
                    message={submitError}
                    onConfirm={() => setSubmitError(null)}
                />
            )}
            {isLoading && <p>Loading...</p>}
            {fetchError && (
                <Error
                    message={fetchError}
                    onConfirm={removeFetchError}
                />
            )}
        </div>
    )
}

export default AddPersonForm

import { useState } from 'react'

import { nanoid } from 'nanoid'

import useHttp from '../../hooks/use-http'

import Card from '../UI/Card'
import Error from '../UI/Error'
import AddPersonForm from './Persons/AddPersonForm'
import Bills from './Bills/Bills'
import ShowPersons from './Persons/ShowPersons'

const URL = 'https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users'
const NAME_REGEX = /^[a-zA-Z0-9\s]*$/g

function PayBill() {
    const [persons, setPersons] = useState([])
    const [personFormError, setPersonFormError] = useState(null)
    const [bills, setBills] = useState([])

    const { error: fetchError, isLoading, sendReq, removeError: removeFetchError } = useHttp()

    const personSelectOptions = persons.map(person => ({
        value: person.id,
        label: person.name
    }))

    const personSubmitHandler = enteredData => {
        if (!enteredData.match(NAME_REGEX) || enteredData.trim().length < 3) {
            setPersonFormError('Invalid name!')
            return
        }

        setPersonFormError(null)

        const applyData = (data) => {
            const [first] = data
            if (first && first.name.toLowerCase() === enteredData.toLowerCase()) {
                setPersons(prevState => [...prevState, {
                    name: first.name,
                    iban: first.iban,
                    total: 0,
                    id: `p-${nanoid()}`
                }])
            } else {
                setPersons(prevState => [...prevState, {
                    name: enteredData,
                    iban: null,
                    total: 0,
                    id: `p-${nanoid()}`
                }])
            }
        }

        const existingPerson = persons.some(person => person.name.toLowerCase() === enteredData.toLowerCase())

        !existingPerson && sendReq({
            url: `${URL}?name=${enteredData}`,
            options: {
                headers: { 'Content-Type': 'application/json' },
            }
        }, applyData)

        existingPerson && setPersonFormError('User has already been added.')
    }

    const billSubmitHandler = data => {
        const { value, total } = data
        const selectValues = value.map(obj => obj.value)

        setBills(prevState => (
            [
                ...prevState,
                {
                    total: total,
                    ids: selectValues
                }
            ]
        ))

        setPersons(prevState => (prevState.map(obj => (
            selectValues.includes(obj.id)
                ? {
                    ...obj,
                    total: obj.total + total / value.length
                }
                : { ...obj }
        ))))
    }

    return (
        <>
            <h1><span>Pay</span>Bill</h1>
            <Card>
                <AddPersonForm
                    onSubmit={personSubmitHandler}
                />
                {personFormError && (
                    <Error
                        message={personFormError}
                        onConfirm={() => setPersonFormError(null)}
                    />
                )}
                {isLoading && <p>Loading...</p>}
                {fetchError && (
                    <Error
                        message={fetchError}
                        onConfirm={removeFetchError}
                    />
                )}
                <hr />
                <Bills
                    onSubmit={billSubmitHandler}
                    options={personSelectOptions}
                    bills={bills}
                />
                <ShowPersons persons={persons} />
            </Card>
        </>
    )
}

export default PayBill

import { nanoid } from 'nanoid'

import { useState } from 'react'

import useHttp from '../../hooks/use-http'

import Card from '../UI/Card'
import Error from '../UI/Error'
import AddPersonForm from './AddPersonForm'
import AddBillForm from './AddBillForm'
import PersonList from './PersonList'

const URL = 'https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users'
const NAME_REGEX = /^[a-zA-Z0-9\s]*$/g

function PayBill() {
    const [persons, setPersons] = useState([])
    const [submitError, setSubmitError] = useState(null)
    const { error: fetchError, isLoading, sendReq } = useHttp()

    const personSelectOptions = persons.map(person => ({
        value: person.id,
        label: person.name
    }))

    const submitHandler = enteredData => {
        if (!enteredData.match(NAME_REGEX) || enteredData.trim().length < 3) {
            setSubmitError('Invalid name!')
            return
        }

        setSubmitError(null)

        const applyData = (data) => {
            // take first since many with the same name at provided url
            const [first] = data
            if (first && first.name.toLowerCase() === enteredData.toLowerCase()) {
                setPersons(prevState => [...prevState, {
                    name: first.name,
                    iban: first.iban,
                    price: 0,
                    id: `p-${nanoid()}`
                }])
            } else {
                setPersons(prevState => [...prevState, {
                    name: enteredData,
                    iban: null,
                    price: 0,
                    id: `p-${nanoid()}`
                }])
            }
        }

        // ovde proveri
        const existingPerson = persons.some(person => person.name.toLowerCase() === enteredData.toLowerCase())

        !existingPerson && sendReq({
            url: `${URL}?name=${enteredData}`,
            options: {
                headers: { 'Content-Type': 'application/json' },
            }
        }, applyData)

        existingPerson && setSubmitError('User has already been added.')
    }

    const priceChangeHandler = data => {
        const { value, averagePrice } = data
        const selectValues = value.map(obj => obj.value)

        setPersons(prevState => (prevState.map(obj => {
            if (selectValues.includes(obj.id)) {
                return Object.assign(obj, { price: obj.price + averagePrice })
            } else {
                return Object.assign(obj)
            }
        })))
    }

    return (
        <Card>
            <AddPersonForm
                onSubmit={submitHandler}
                error={submitError}
            />
            {isLoading && <p>Loading...</p>}
            {fetchError && <Error message={fetchError} />}
            <hr />
            <AddBillForm
                onPriceChange={priceChangeHandler}
                options={personSelectOptions}
            />
            <PersonList persons={persons} />
        </Card>
    )
}

export default PayBill

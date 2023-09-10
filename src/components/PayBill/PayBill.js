import { useState } from 'react'

import { nanoid } from 'nanoid'

import Card from '../UI/Card'
import AddPersonForm from './Persons/AddPersonForm'
import Bills from './Bills/Bills'
import ShowPersons from './Persons/ShowPersons'

function PayBill() {
    const [persons, setPersons] = useState([])
    const [bills, setBills] = useState([])

    const personSelectOptions = persons.map(person => ({
        value: person.id,
        label: person.name
    }))

    const personSubmitHandler = personData => {
        personData && personData.name &&
            setPersons(prevState => [
                ...prevState, {
                    ...personData,
                    total: 0,
                    id: `p-${nanoid()}`
                }]
            )
    }

    const billSubmitHandler = billData => {
        const { selectedValues, total } = billData
        const selectedIds = selectedValues.map(obj => obj.value)

        setBills(prevState => [
            ...prevState, {
                total,
                persons: selectedValues
            }
        ])

        setPersons(prevState => prevState.map(obj => (
            selectedIds.includes(obj.id)
                ? {
                    ...obj,
                    total: obj.total + total / selectedValues.length
                }
                : { ...obj }
        )))
    }

    return (
        <>
            <h1><span>Pay</span>Bill</h1>
            <Card>
                <AddPersonForm
                    options={personSelectOptions}
                    onSubmit={personSubmitHandler}
                />
                <hr />
                <Bills
                    bills={bills}
                    options={personSelectOptions}
                    onSubmit={billSubmitHandler}
                />
                <ShowPersons persons={persons} />
            </Card>
        </>
    )
}

export default PayBill

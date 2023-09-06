import { useState, useRef } from 'react'

import Button from '../UI/Button'
import BillFormGroup from './BillFormGroup'
import Error from '../UI/Error'

function AddBillForm({ onPriceChange, options }) {
    const [itemCounter, setItemCounter] = useState(1)
    const [error, setError] = useState(null)

    const activeInputRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()

        const { price, value } = activeInputRef.current.props
        const isInvalid = !price || value === null || value.length < 2

        if (isInvalid) {
            !price
                ? setError('Price can\'t be 0')
                : setError('Please select at least two options')
            return
        }

        setError(null)

        onPriceChange({ value, averagePrice: price / value.length })
        setItemCounter(prevState => prevState + 1)
    }

    return (
        <>
            <form className='m-tb' onSubmit={handleSubmit}>
                {[...Array(itemCounter).keys()].map(i => {
                    return (
                        <BillFormGroup
                            ref={i === itemCounter - 1 ? activeInputRef : undefined}
                            key={i}
                            id={i}
                            options={options}
                            isDisabled={i === itemCounter - 1 ? false : true}
                        />
                    )
                })}
                <Button>
                    Add item
                </Button>
            </form>
            {error && <Error message={error} />}
        </>
    )
}

export default AddBillForm

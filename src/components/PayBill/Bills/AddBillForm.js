import { useState, useRef } from 'react'

import Select from 'react-select'

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Error from '../../UI/Error'

import classes from './AddBillForm.module.css'

function AddBillForm({ options, onSubmit }) {
    const [price, setPrice] = useState(0)
    const [error, setError] = useState(null)
    const [isSelectDisabled, setIsSelectDisabled] = useState(true)
    const selectInputRef = useRef()

    const changeHandler = e => {
        const priceNum = Number(e.target.value)
        setPrice(priceNum)

        priceNum > 0
            ? setIsSelectDisabled(false)
            : setIsSelectDisabled(true)
    }

    const submitHandler = e => {
        e.preventDefault()

        setError(null)

        const selectedValues = selectInputRef.current.props.value
        const isInvalid = price <= 0 || selectedValues === null || selectedValues.length < 2

        if (isInvalid) {
            setError(price <= 0
                ? 'Price can\'t be 0.'
                : 'Please select at least two options.'
            )
            return
        }

        onSubmit({ selectedValues, total: price })

        setPrice(0)
        setIsSelectDisabled(true)
        selectInputRef.current.setValue([])
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className={classes.row}>
                    <Input
                        onChange={changeHandler}
                        label='Price'
                        options={{
                            type: 'number',
                            id: `price-inp`,
                            name: `price-inp`,
                            value: price,
                            min: 0
                        }}
                    />
                    <div>
                        <p className={classes['select-label']}>People</p>
                        <Select
                            isMulti
                            options={options}
                            id='persons-sel'
                            name='persons-sel'
                            isDisabled={isSelectDisabled}
                            price={price}
                            ref={selectInputRef}
                        />
                    </div>
                </div>
                <Button>
                    Add item
                </Button>
            </form>
            {error && (
                <Error
                    message={error}
                    onConfirm={() => setError(null)}
                />
            )}
        </>
    )
}

export default AddBillForm

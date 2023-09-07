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
        setPrice(e.target.value)

        e.target.value > 0
            ? setIsSelectDisabled(false)
            : setIsSelectDisabled(true)
    }

    const submitHandler = e => {
        e.preventDefault()

        const selectValue = selectInputRef.current.props.value
        const isInvalid = price === 0 || selectValue === null || selectValue.length < 2

        if (isInvalid) {
            !price
                ? setError('Price can\'t be 0')
                : setError('Please select at least two options')
            return
        }

        selectInputRef.current.setValue([])
        setPrice(0)
        onSubmit({ value: selectValue, total: price })
    }

    return (
        <>
            <form className='m-tb' onSubmit={submitHandler}>
                <div className={classes.row}>
                    <Input
                        onChange={changeHandler}
                        label='Price'
                        options={{
                            type: 'number',
                            id: `price`,
                            name: `price`,
                            value: price,
                            min: 0
                        }}
                    />
                    <div>
                        <p className={classes['select-label']}>People</p>
                        <Select
                            isMulti
                            options={options}
                            id={`persons`}
                            name={`persons`}
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

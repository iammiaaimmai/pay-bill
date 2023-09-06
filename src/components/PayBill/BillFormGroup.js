import classes from './BillFormGroup.module.css'

import { useState, forwardRef } from 'react'

import Select from 'react-select'

import Input from '../UI/Input'

const PriceInputs = forwardRef(function PriceInputs({ id, options, isDisabled }, ref) {
    const [price, setPrice] = useState(0)
    const [isSelectDisabled, setIsSelectDisabled] = useState(true)

    const handleChange = e => {
        setPrice(e.target.value)

        e.target.value > 0
            ? setIsSelectDisabled(false)
            : setIsSelectDisabled(true)
    }

    return (
        <div className={classes.row}>
            <Input
                onChange={handleChange}
                label='Price'
                options={{
                    type: 'number',
                    id: `price-${id}`,
                    name: `price-${id}`,
                    value: price,
                    disabled: isDisabled,
                    min: 0
                }}
            />
            <div>
                <p className={classes['select-label']}>People</p>
                <Select
                    textFieldProps={{
                        label: 'Label',
                        InputLabelProps: {
                            shrink: true,
                        },
                    }}
                    isMulti
                    options={options}
                    id={`persons-${id}`}
                    name={`persons-${id}`}
                    isDisabled={isDisabled || isSelectDisabled}
                    ref={ref}
                    price={price}
                />
            </div>

        </div>
    )
})

export default PriceInputs

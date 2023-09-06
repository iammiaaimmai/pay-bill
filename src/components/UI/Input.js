import { forwardRef } from 'react'
import classes from './Input.module.css'

const Input = forwardRef(function Input({ label, options, onChange }, ref) {
    return (
        <div className={classes.input}>
            {label && options.id && (
                <label htmlFor={options.id}>{label}</label>)
            }
            <input
                ref={ref}
                onChange={onChange}
                {...options}
            />
        </div>
    )
})

export default Input

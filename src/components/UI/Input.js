import { forwardRef } from 'react'
import classes from './Input.module.css'

const Input = forwardRef(function Input({ label, options, onChange, className }, ref) {
    const inputClasses = className
        ? `${className} ${classes['form-control']}`
        : classes['form-control']

    return (
        <div className={inputClasses}>
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

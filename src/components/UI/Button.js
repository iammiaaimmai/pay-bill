import classes from './Button.module.css'

function Button({ children, className, type, onClick }) {
    const btnClasses = className
        ? `${classes.btn} ${className}`
        : classes.btn

    return (
        <button
            type={type || 'submit'}
            className={btnClasses}
            onClick={onClick}
        >
            {children || 'Add'}
        </button>
    )
}

export default Button

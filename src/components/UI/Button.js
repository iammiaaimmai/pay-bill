import classes from './Button.module.css'

const Button = props => {
    const btnClasses = props.className
        ? `${classes.btn} ${props.className}`
        : classes.btn

    return (
        <button
            type={props.type || 'submit'}
            className={btnClasses}
            onClick={props.onClick}
        >
            {props.children || 'Add'}
        </button>
    )
}

export default Button

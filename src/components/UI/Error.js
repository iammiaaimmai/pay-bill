import classes from './Error.module.css'

function Error({ message, onConfirm }) {
    return (
        <div className={classes.err}>
            <span>{message ? message : 'Something went wrong!'}</span>
            <span
                className={classes['close-btn']}
                onClick={() => onConfirm && onConfirm()}
            >
            </span>
        </div>
    )
}

export default Error

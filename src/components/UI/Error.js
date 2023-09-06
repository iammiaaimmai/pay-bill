import classes from './Error.module.css'

function Error({ message }) {
    return (
        <span className={classes.err}>
            {message ? message : 'Something went wrong!'}
        </span>
    )
}

export default Error

import classes from './Card.module.css'

function Card({ children, className }) {
    const cardClasses = className
        ? `${classes.card} ${className}`
        : classes.card

    return (
        <div className={cardClasses}>
            {children}
        </div>
    )
}

export default Card

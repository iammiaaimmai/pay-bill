import classes from './ShowBills.module.css'

function ShowBills({ bill: { total, persons } }) {
    return (
        <div className={classes.row}>
            <div >
                <p className={classes.heading}>Price</p>
                <span className={classes.box}>{total}</span>
            </div>
            <div >
                <p className={classes.heading}>People</p>
                <ul className={`${classes.list} ${classes.box}`} >
                    {persons.map(person => (
                        <li key={person.value}>
                            {person.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ShowBills

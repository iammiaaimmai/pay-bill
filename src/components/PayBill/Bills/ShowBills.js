import classes from './ShowBills.module.css'

function ShowBills({ bill, options }) {
    const { total, ids } = bill
    const personsIds = options.map(option => option.value)

    const persons = ids.map(id => {
        const index = personsIds.indexOf(id)
        return (
            <li key={id}>
                {options[index].label}
            </li>
        )
    })

    return (
        <div className={classes.row}>
            <div >
                <p className={classes.heading}>Price</p>
                <span className={classes.box}>{total}</span>
            </div>
            <div >
                <p className={classes.heading}>People</p>
                <ul className={`${classes.list} ${classes.box}`} >
                    {persons}
                </ul>
            </div>
        </div>
    )
}

export default ShowBills

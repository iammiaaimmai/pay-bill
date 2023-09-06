import classes from './PersonsList.module.css'

function PersonList({ persons }) {
    return (
        <div className='m-tb'>
            <div className={`${classes.row} ${classes.heading}`}>
                <p>Name</p>
                <p>Pay</p>
                <p>IBAN</p>
            </div>

            <hr />

            {persons.length === 0 && (
                <p className={classes['fallback-text']}>Start Sharing Bills. Add People To The List.</p>
            )}

            {persons.length > 0 && (
                <div>
                    {persons.map(person => (
                        <div
                            className={classes.row}
                            key={person.id}
                        >
                            <p>{person.name}</p>
                            <p>{person.price}</p>
                            <p>{person.iban || 'No IBAN available'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PersonList

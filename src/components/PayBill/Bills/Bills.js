import AddBillForm from './AddBillForm'
import ShowBills from './ShowBills'

function Bills({ onSubmit, options, bills }) {

    const submitHandler = submittedData => onSubmit(submittedData)

    return (
        <>
            {bills.map((bill, i) => (
                <ShowBills
                    key={i}
                    bill={bill}
                    options={options}
                />
            ))}
            <AddBillForm
                options={options}
                onSubmit={submitHandler}
            />
        </>
    )
}

export default Bills

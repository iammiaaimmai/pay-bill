import AddBillForm from './AddBillForm'
import ShowBills from './ShowBills'

function Bills({ bills, options, onSubmit }) {

    const submitHandler = submittedData => onSubmit(submittedData)

    return (
        <div className='m-tb'>
            {bills.map((bill, i) => (
                <ShowBills
                    key={i}
                    bill={bill}
                />
            ))}
            <AddBillForm
                options={options}
                onSubmit={submitHandler}
            />
        </div>
    )
}

export default Bills

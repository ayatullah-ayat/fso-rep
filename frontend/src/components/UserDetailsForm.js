import useField from "../hooks/field"

const UserDetailsForm = () => {

    const name = useField('text');
    const birthdate = useField('date');
    const age = useField('number');

    return(
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input {...name} className='form-control' />
            </div>
            <div className="form-group">
                <label htmlFor="birthdate">Birthdate</label>
                <input {...birthdate} className='form-control' />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input {...age} className='form-control' />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default UserDetailsForm;
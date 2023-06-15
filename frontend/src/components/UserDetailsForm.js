import { useState } from "react"

const UserDetailsForm = () => {

    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [age, setAge] = useState('')

    return(
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
            </div>
            <div className="form-group">
                <label htmlFor="birthdate">Birthdate</label>
                <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className='form-control' />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className='form-control' />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default UserDetailsForm;
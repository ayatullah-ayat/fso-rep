import PropTypes from 'prop-types';

const LoginForm = ({
    username,
    password,
    handleUserNameChange,
    handlePasswordChange,
    handleLogin }) => {

    return (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">User Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={handleUserNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange} />
            </div>
            <div className='mt-3'>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUserNameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm;
const RegisterForm = (props: { RegData: any, handleRegData: any, postRegData: any }) => {
    return (
        <form onSubmit={(e) => props.postRegData(e)}>
            <label>
                <input type="email" id="RegEmail" name="email" placeholder="Enter email" value={props.RegData.email} onChange={(e) => props.handleRegData(e)} required />
            </label>
            <label>
                <input type="email" id="RegConfirmEmail" name="email" placeholder="Confirm Email" />
            </label>

            <label>
                <input type="password" id="RegPassword" name="password" placeholder="Enter password"  value={props.RegData.password} onChange={(e) => props.handleRegData(e)} required />
            </label>
            <label>
                <input type="password" id="RegConfirmPassword" name="password" placeholder="Confirm password" />
            </label>
            <button> Send </button>
        </form>
    )
}
export default RegisterForm
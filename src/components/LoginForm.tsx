const LoginForm = (props: {LoginData: any, handleLoginData: any, postLoginData: any}) => {
    return(
    <form onSubmit={(e) => props.postLoginData(e)}>
        <label>
            <input type="email" id="LoginEmail" name="email" placeholder="Enter email" required value={props.LoginData.email} onChange={(e) => props.handleLoginData(e)} />
        </label>
        <label>
            <input type="password" id="LoginPassword" name="password" placeholder="Enter password" required value={props.LoginData.password} onChange={(e) => props.handleLoginData(e)} />
        </label>
        <button> Send </button>
    </form>
    )
}
export default LoginForm
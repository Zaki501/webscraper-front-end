import LoginForm from "../components/LoginForm"

const Login = (props: {LoginData: any, handleLoginData: any, postLoginData: any}) => {
    return (
        <div>
            <h2>LOGIN PAGE!!</h2>
            <LoginForm LoginData={props.LoginData} handleLoginData={props.handleLoginData} postLoginData={props.postLoginData} />
        </div>
    )
}
export default Login
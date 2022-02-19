import RegisterForm from "../components/RegisterForm"

const Register = (props: { RegData: any, handleRegData: any, postRegData: any }) => {

    return (
        <div>
            <h2>
                Register page !!!
            </h2>
            <RegisterForm RegData={props.RegData} handleRegData={props.handleRegData} postRegData={props.postRegData}/>
        </div>

    )
}
export default Register
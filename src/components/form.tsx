const Form = (props: { InputData: any, handleInputData: any, postInputData: any, getData: any }) => {
    return (
        <div>
            <h2>{ }</h2>
            {/* <form action="/" method="post"> */}
            {/* <form onSubmit={() => { props.postInputData(); props.getData(); }}> */}
            <form onSubmit={(e) => props.postInputData(e)}>
                <label htmlFor="name">Name
                    <input type="text" id="name" name="name" value={props.InputData.name} onChange={(e) => props.handleInputData(e)} />
                </label>

                <label htmlFor="email">Email
                    <input type="email" id="email" name="email" value={props.InputData.email} onChange={(e) => props.handleInputData(e)} />
                </label>

                <button> Send </button>
            </form>

        </div>
    )
}

export default Form
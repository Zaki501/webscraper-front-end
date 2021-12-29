const UrlForm = (props: { UrlData: any, handleUrlData: any, postUrlData: any, ConfirmationData: any }) => {
    return (
        <div>
            <form onSubmit={(e) => props.postUrlData(e)}>
                <h2>Amazon item tracker</h2>
                <label htmlFor="url">url
                    <input type="text" id="url" name="url" value={props.UrlData} onChange={(e) => props.handleUrlData(e)} />
                </label>
                {props.ConfirmationData === null ? "" : <img alt="asdsa" src={props.ConfirmationData.img_src}></img>}
                <button> Send </button>
            </form>

        </div>
    )
}
export default UrlForm
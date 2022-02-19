const Profile = (props: {userProfile: any}) => {
    return (
        <div>
            <h2>
                USER PROFILE PAGE!
            </h2>
            <button onClick={props.userProfile()} />
        </div>
    )
}
export default Profile
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import GroupList from "./LoggedInComponents/GroupList";
import PleaseLogIn from "./LoginAndSignupComponents/PleaseLogIn";

export default function CheckIfUserIsLoggedIn() {
    const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true')
    const [asWho, setAsWho] = useState(localStorage.getItem('asWho') === 'false')

    useEffect(() => {
        if (rememberMe === null) {
            localStorage.setItem('rememberMe', false)
            setRememberMe(false)
        }
    }, [])

    return (
        <div>
            { rememberMe ? <Redirect to="/my-groups" /> : <PleaseLogIn /> }
        </div>
    )
}
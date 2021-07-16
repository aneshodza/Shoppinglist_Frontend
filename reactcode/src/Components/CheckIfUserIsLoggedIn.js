import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GroupList from "./GroupList";
import PleaseLogIn from "./PleaseLogIn";

export default function CheckIfUserIsLoggedIn() {
    const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') == 'true')
    const [asWho, setAsWho] = useState(localStorage.getItem('asWho') == 'false')

    useEffect(() => {
        if (rememberMe === null) {
            localStorage.setItem('rememberMe', false)
            setRememberMe(false)
        }
    }, [])

    return (
        <div>
            { rememberMe ? <GroupList test={rememberMe} /> : <PleaseLogIn /> }
        </div>
    )
}
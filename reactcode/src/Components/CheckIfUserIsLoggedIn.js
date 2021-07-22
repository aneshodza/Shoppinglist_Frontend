import { useEffect, useState } from "react";
import { Redirect } from "react-router";

export default function CheckIfUserIsLoggedIn() {
    const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true')
    const [redirect, setRedirect] = useState('')

    useEffect(() => {

        if (rememberMe === null) {
            localStorage.setItem('rememberMe', false)
            setRememberMe(false)
        } else if (rememberMe) {
            let obj = {
                username: localStorage.getItem('rememberedUsername'),
                password: localStorage.getItem('rememberedPassword')
            }

            fetch("http://localhost:8080/people", {
            method: "put",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(obj)
        })
            .then(r => r.json())
            .then(r => verifyAutoLogin(r))
        }
    }, [])

    const verifyAutoLogin = (retVal) => {
        setRedirect(<Redirect to={{
            pathname: "/my-groups",
            state: {userAccount: retVal}
        }}/>)
    }

    return (
        <div>
            { rememberMe ? redirect : <Redirect to="/login" /> }
        </div>
    )
}
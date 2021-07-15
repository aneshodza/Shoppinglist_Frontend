import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GroupList from "./GroupList";
import PleaseLogIn from "./PleaseLogIn";

export default function CheckIfUserIsLoggedIn() {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'))
    const [asWho, setAsWho] = useState(localStorage.getItem('asWho'))

    useEffect(() => {

        if (isLogged === null) {
            localStorage.setItem('isLogged', false)
        }
    })

    return (
        isLogged ? <GroupList /> : <PleaseLogIn />
    )
}
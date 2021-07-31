import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogInWindow() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [givenUsername, setGivenUsername] = useState()
    const [givenPassword, setGivenPassword] = useState()
    const [redirect, setRedirect] = useState()
    const [errorLabel, setErrorLabel] = useState({
        fields: '',
        errorMessage: ''
    })

    useEffect(() => {
        localStorage.setItem('loggedIn', false)
    }, [])

    const handleLogin = () => {
        localStorage.setItem('rememberMe', rememberMe)

        let obj = {
            username: givenUsername,
            password: givenPassword,
        }

        fetch("http://192.168.1.120:8080/people", {
            method: "put",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(obj)
        })
            .then(r => r.json())
            .then(r => checkIfWorked(r))
    }

    const checkIfWorked = (retVal) => {

        if (retVal.password === null) {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'The user has not been found'
            })
            return 1
        }

        if (rememberMe) {
            localStorage.setItem('rememberedUsername', retVal.username)
            localStorage.setItem('rememberedPassword', retVal.password)
            localStorage.setItem('rememberedId', retVal.id)
        }
        localStorage.setItem('loggedIn', true)
        setRedirect(<Redirect to={{
            pathname: "/my-groups",
            state: {userAccount: retVal}
        }} />)
        setRedirect('')
    }

    return (
        <Form>
            <Form.Group style={{ width: "200px" }}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" onChange={(e) => setGivenUsername(e.target.value)} style={{ borderColor: errorLabel.fields }}/>
            </Form.Group>
            <Form.Group style={{ width: "200px" }}>
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword ? "" : "password"} placeholder="Password" onChange={(e) => setGivenPassword(e.target.value)} style={{ borderColor: errorLabel.fields }}/>
                <small><Form.Check type="checkbox" label="Show password" className="text-muted" onClick={() => setShowPassword(!showPassword)} /></small>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" label="Keep me logged in" onClick={() => setRememberMe(!rememberMe)} />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Log in</Button>
            <p style={{ color: 'red' }}>{ errorLabel.errorMessage }</p>
            <Button variant="primary" onClick={() => setRedirect(<Redirect to="/signup" />)}>I don't have an account</Button>
            { redirect }
        </Form>
    )
}
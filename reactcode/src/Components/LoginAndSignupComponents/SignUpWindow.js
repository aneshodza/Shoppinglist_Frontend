import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUpWindow() {
    const [givenFirstName, setGivenFirstName] = useState('')
    const [givenLastName, setGivenLastName] = useState('')
    const [givenUsername, setGivenUsername] = useState('')
    const [givenPassword, setGivenPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [redirect, setRedirect] = useState('')
    const [errorLabel, setErrorLabel] = useState({
        fields: '',
        errorMessage: ''
    })

    const handleSignUp = () => {
        localStorage.setItem('rememberMe', rememberMe)

        if (!givenFirstName.replace(/\s/g, '').length) {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'Your first name cannot be blank'
            })
            return 1
        } else if (!givenLastName.replace(/\s/g, '').length) {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'Your last name cannot be blank'
            })
            return 1
        } else if (!givenUsername.replace(/\s/g, '').length) {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'Your username cannot be blank'
            })
            return 1
        } else if (givenPassword.replace(/\s/g, '').length < 8) {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'Your password cannot be under 8 characters'
            })
            return 1
        }

        let obj = {
            first_name: givenFirstName,
            last_name: givenLastName,
            username: givenUsername,
            password: givenPassword,
        }

        fetch("http://192.168.1.120:8080/people", {
            method: "post",
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

        if (retVal.returnMessage === 'Username is already in use') {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'The username is already in use'
            })
            return 1
        } else if (retVal.returnMessage === 'Password is not 8 characters long') {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'The password is too short'
            })
            return 1
        } else if (retVal.returnMessage === 'Username cannot be empty') {
            setErrorLabel({
                fields: 'red',
                errorMessage: 'The username cannot be empty'
            })
            return 1
        }
        console.log(rememberMe)
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
                <Form.Label>First name</Form.Label>
                <Form.Control type="username" placeholder="First name" onChange={(e) => setGivenFirstName(e.target.value)} style={{ borderColor: errorLabel.fields }} />
            </Form.Group>
            <Form.Group style={{ width: "200px" }}>
                <Form.Label>Last name</Form.Label>
                <Form.Control type="username" placeholder="Last name" onChange={(e) => setGivenLastName(e.target.value)} style={{ borderColor: errorLabel.fields }} />
            </Form.Group>
            <Form.Group style={{ width: "200px" }}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" onChange={(e) => setGivenUsername(e.target.value)} style={{ borderColor: errorLabel.fields }} />
            </Form.Group>
            <Form.Group style={{ width: "200px" }}>
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword ? "" : "password"} placeholder="Password" onChange={(e) => setGivenPassword(e.target.value)} style={{ borderColor: errorLabel.fields }} />
                <small><Form.Check type="checkbox" label="Show password" className="text-muted" onClick={() => setShowPassword(!showPassword)} /></small>
            </Form.Group>

            <Form.Group>
                <Form.Check type="checkbox" label="Keep me logged in" onClick={() => setRememberMe(!rememberMe)} />
            </Form.Group>

            <Button variant="primary" onClick={() => handleSignUp()}>Sign up</Button>
            <p style={{ color: 'red' }}>{ errorLabel.errorMessage }</p>
            <Button variant="primary" onClick={() => setRedirect(<Redirect to="/login" />)}>I aready have an account</Button>
            { redirect }
            
        </Form>
    )
}
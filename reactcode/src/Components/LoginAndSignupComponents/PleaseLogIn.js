import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PleaseLogIn() {

    localStorage.setItem('loggedIn', false)

    return (
        <Container>
            <Row>
                <h3>Create an account or sign up</h3>
            </Row>
            <Row>
                <Link to='/login'>
                    <Button variant="success">Log in</Button>
                </Link>
                <Link to='/signup'>
                    <Button variant="primary">Sign up</Button>
                </Link>
            </Row>

        </Container>
    )
}
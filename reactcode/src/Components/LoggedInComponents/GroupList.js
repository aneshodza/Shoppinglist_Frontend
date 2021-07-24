import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default function GroupList(props) {
    const [myGroups, setMyGroups] = useState([])

    useEffect(() => {
        localStorage.setItem('lastUrl', props.location.state.userAccount.ownUrl)
        if (localStorage.getItem('rememberMe') == 'false') {
            localStorage.removeItem('rememberedPassword')
            localStorage.removeItem('rememberedUsername')
        }
        if (props.location.state !== undefined) {
            fetch('http://localhost:8080/people/' + props.location.state.userAccount.id + '/my-groups')
                .then(r => r.json())
                .then(r => setMyGroups(r))
        }
    }, [])

    return (
        <Container>
            <Row>
                <h1>
                    You are currently logged in as {props.location.state === undefined ? <Redirect to="/" /> : props.location.state.userAccount.username} {props.location.state === undefined ? <Redirect to="/" /> : <small>(#{props.location.state.userAccount.ownUrl})</small>}
                </h1>
            </Row>
            {myGroups.map((g) =>
                <Link to={{
                    pathname: `/my-groups/${g.groupUrl}`,
                    state: {userAccount: props.location.state.userAccount}
                }}>
                    <Row style={{ border: "1px solid black", margin: "5px" }} key={g.groupUrl}>
                        <h3 >Group: {g.groupName}</h3>
                    </Row>
                    </Link>
            )}

        </Container>
    )
}
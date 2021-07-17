import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default function GroupList(props) {
    const [myGroups, setMyGroups] = useState([])
    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        console.log(props)
        if (props.location.state !== undefined) {
            fetch('http://localhost:8080/people/' + props.location.state.userAccount.id + '/my-groups')
                .then(r => r.json())
                .then(r => setMyGroups(r))
        }
    }, [])

    return (
        <Container>
            <Row>
                <h1>You are currently logged in as {props.location.state === undefined ? <Redirect to="/" /> : props.location.state.userAccount.username}</h1>
            </Row>
            {myGroups.map((g) =>
                <Link to={`/my-groups/${g.groupUrl}`}><Row style={{ border: "1px solid black", margin: "5px" }}>
                    <h3 key={g.groupId}>Group: {g.groupName}</h3>
                </Row></Link>
            )}

        </Container>
    )
}
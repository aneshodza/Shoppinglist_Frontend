import { useEffect, useState } from "react";
import { Button, Container, Row, Modal, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default function GroupList(props) {
    const [myGroups, setMyGroups] = useState([])
    const [myAccount, setMyAccount] = useState({
        id: 0,
        ownUrl: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        groupIds: [],
        invitations: []
    })
    const [showInvites, setShowInvites] = useState(false)
    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        console.log(myAccount)
        if (localStorage.getItem('loggedIn') !== 'true') {
            setRedirect(<Redirect to="/login" />)
        } else {
            if (localStorage.getItem('rememberMe') == 'false') {
                localStorage.removeItem('rememberedPassword')
                localStorage.removeItem('rememberedUsername')
            }
            if (props.location.state !== undefined) {
                setMyAccount(props.location.state.userAccount)
                getMyGroups(props.location.state.userAccount.id)
            } else {
                console.log(localStorage.getItem('lastUrl'))
                fetch('http://localhost:8080/people/' + localStorage.getItem('lastUrl'))
                    .then(r => r.json())
                    .then(r => setMyAccount(r))
                    .then(() => getMyGroups(myAccount.id))
            }
        }
    }, [])

    const getMyGroups = (id) => {
        fetch('http://localhost:8080/people/' + id + '/my-groups')
            .then(r => r.json())
            .then(r => setMyGroups(r))
    }

    const refreshInvitesAndShow = () => {
        fetch('http://localhost:8080/people/' + props.location.state.userAccount.ownUrl)
            .then(r => r.json())
            .then(r => setMyAccount(r))
            .then(r => console.log(r))
            .then(() => setShowInvites(true))
    }

    return (
        <Container>
            <Row>
                <h1>
                    You are currently logged in as {props.location.state === undefined ? <Redirect to="/" /> : props.location.state.userAccount.username} {props.location.state === undefined ? <Redirect to="/" /> : <small>(#{props.location.state.userAccount.ownUrl})</small>}
                    <Button variant='primary' style={{ float: 'right', marginTop: '10px' }} onClick={() => refreshInvitesAndShow()}>My invites</Button>
                </h1>
            </Row>
            {(!myGroups.length) ? <h2>You are in no groups yet</h2> : myGroups.map((g) =>
                <Link to={{
                    pathname: `/my-groups/${g.groupUrl}`,
                    state: { userAccount: props.location.state.userAccount }
                }}>
                    <Row style={{ border: "1px solid black", margin: "5px" }} key={g.groupUrl}>
                        <h3 >Group: {g.groupName}</h3>
                    </Row>
                </Link>
            )}

            <Modal show={showInvites} onHide={() => setShowInvites(false)}>
                <Modal.Header>
                    <Modal.Title>Create a new item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(!myAccount.invitations.length) ? <h2>You dont have any invitations</h2> : myAccount.invitations.map((i) =>
                        <Card style={{ marginBottom: '10px' }}>
                            <Card.Title style={{ paddingLeft: '10px', paddingTop: '10px' }}>Invitation to: {i.groupName}</Card.Title>
                            <Card.Subtitle style={{ paddingLeft: '10px', paddingBottom: '10px' }}>Sent by {i.senderUsername}</Card.Subtitle>
                            <Card.Footer>{timeSince(i.whenSent)} ago</Card.Footer>
                        </Card>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowInvites(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            {redirect}
        </Container>
    )
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " year(s)";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " month(s)";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " day(s)";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hour(s)";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minute(s)";
    }
    return Math.floor(seconds) + " second(s)";
}
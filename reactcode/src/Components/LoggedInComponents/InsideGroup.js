import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InsideGroup(props) {
    const [redirect, setRedirect] = useState('')
    const [myAccount, setMyAccount] = useState({})

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [newItem, setNewItem] = useState({
        itemName: '',
        message: '',
        personId: ''
    })

    const [showInviteModal, setShowInviteModal] = useState(true)
    const [invitationUrl, setInvitationUrl] = useState('')

    const [showMembers, setShowMembers] = useState(true)

    const [thisGroup, setThisGroup] = useState({
        groupName: '',
        members: [{
            first_name: '',
            last_name: '',
            username: ''
        }],
        items: [{
            id: 0,
            itemName: '',
            message: ''
        }]
    })

    useEffect(() => {
        console.log(props)
        if (localStorage.getItem('loggedIn') !== 'true') {
            setRedirect(<Redirect to="/login" />)
        }
        if (props.location.state === undefined) {
            fetch('http://localhost:8080/people/' + localStorage.getItem('lastUrl'))
                .then(r => r.json())
                .then(r => setMyAccount(r))
        } else {
            setMyAccount(props.location.state.userAccount)
        }
        console.log(myAccount)
        fetchItems()
    }, [])

    const fetchItems = () => {
        fetch('http://localhost:8080/groups/' + props.match.params.groupUrl)
            .then(r => r.json())
            .then(r => handleFetch(r))
    }

    const handleFetch = (obj) => {
        setThisGroup(obj)
    }

    const handleDelete = (id) => {
        fetch('http://localhost:8080/items/' + id, {
            method: 'delete'
        })
            .then(() => fetchItems())
    }

    const handleCreate = () => {
        fetch('http://localhost:8080/items/' + thisGroup.id, {
            method: 'put',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({...newItem, personId: myAccount.id})
        })
            .then(() => setShowCreateModal(false))
            .then(() => fetchItems())
    }

    const handleInvite = () => {
        fetch('http://localhost:8080/invitations/' + invitationUrl, {
            method: 'put',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({senderUrl: myAccount.ownUrl, groupUrl: props.match.params.groupUrl})
        })
            .then(() => setShowInviteModal(false))
            .then(() => fetchItems())
    }

    return (
        <Container>
            <Row>
                <Col><h3>{thisGroup.groupName}</h3></Col>
            </Row>
            <Row>
                <Card
                    style={{ border: "1px solid black", margin: "2px", padding: "5px", width: "250px", cursor: "pointer", userSelect: "none" }}
                    onClick={() => setShowMembers(!showMembers)}
                >
                    This group has {thisGroup.members.length} members
                </Card>
                {(showMembers) ? <br/> : thisGroup.members.map((member) =>
                    <Row>
                        <Card style={{ border: "1px solid black", margin: "2px", padding: "5px", width: "250px" }}>
                            {member.first_name} {member.last_name} ({member.username})
                        </Card>
                    </Row>
                )}
            </Row>
            <Row style={{ marginBottom: "15px", marginTop: "15px" }}>
                <Col>
                    <h3>Items:</h3>
                </Col>
                <Col>
                    <Button variant='success' style={{ float: "right"}} onClick={() => setShowCreateModal(true)}>Add new item</Button>
                    <Button variant='primary' style={{ float: "right", marginRight: '10px'}} onClick={() => setShowInviteModal(true)}>Invite new user</Button>   
                </Col>
            </Row>
            {thisGroup.items.map((item) =>
                <Card style={{ border: "1px solid black", margin: "10px" }}>
                    <Card.Body eventKey={item.id}>
                        <Row>
                            <Col style={{ width: '50%', marginRight: '0px' }}>
                                <Card.Title>{item.itemName}</Card.Title>
                                <Card.Subtitle>Posted by {thisGroup.members.filter(person => person.id === item.personId).map(person => person.username)}</Card.Subtitle>
                                <Card.Text>{item.message}</Card.Text>
                            </Col>
                            <Col style={{ textAlign: 'right', marginTop: 'auto', marginBottom: 'auto'}}>
                                <Button variant='danger' onClick={() => handleDelete(item.id)}>Delete item</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header>
                    <Modal.Title>Create a new item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{ width: "200px" }}>
                            <Form.Label>Item name:</Form.Label>
                            <Form.Control type="username" placeholder="Item name" onChange={(e) => setNewItem({...newItem, itemName: e.target.value})}/>
                            <Form.Label style={{ marginTop: '10px' }}>Message:</Form.Label>
                            <Form.Control type="username" placeholder="Message" onChange={(e) => setNewItem({...newItem, message: e.target.value})}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => handleCreate()}>Save</Button>
                    <Button variant='secondary' onClick={() => setShowCreateModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
                <Modal.Header>
                    <Modal.Title>Invite a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{ width: "200px" }}>
                            <Form.Label>User URL:</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="hashtag-addon">#</InputGroup.Text>
                                <Form.Control type="username" placeholder="User URL" aria-describedby="hashtag-addon" onChange={(e) => setInvitationUrl(e.target.value)}/>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => handleInvite()}>Invite</Button>
                    <Button variant='secondary' onClick={() => setShowInviteModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            { redirect }
        </Container>
    )
}
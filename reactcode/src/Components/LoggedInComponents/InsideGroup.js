import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InsideGroup(props) {

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
        fetchItems()
    }, [])

    const fetchItems = () => {
        fetch('http://localhost:8080/groups/' + props.match.params.groupUrl)
            .then(r => r.json())
            .then(r => handleFetch(r))
    }

    const handleFetch = (obj) => {
        setThisGroup(obj)
        console.log(obj)
    }

    const handleDelete = (id) => {
        console.log(id)
        fetch('http://localhost:8080/items/' + id, {
            method: 'delete'
        })
            .then(() => fetchItems())
    }

    return (
        <Container>
            <Row>
                <Col><h3>Group {thisGroup.groupName}</h3></Col>
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
            <Row>
                <h3>Items:</h3>
            </Row>
            {thisGroup.items.map((item) =>
                <Card style={{ border: "1px solid black", margin: "10px" }}>
                    <Card.Body eventKey={item.id}>
                        <Row>
                            <Col style={{ width: '50%', marginRight: '0px' }}>
                                <Card.Title>{item.itemName}</Card.Title>
                                <Card.Subtitle>Postet by {thisGroup.members.filter(person => person.id === item.personId).map(person => person.username)}</Card.Subtitle>
                                <Card.Text>{item.message}</Card.Text>
                            </Col>
                            <Col style={{ textAlign: 'right', marginTop: 'auto', marginBottom: 'auto'}}>
                                <Button variant='danger' onClick={() => handleDelete(item.id)}>Delete item</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}
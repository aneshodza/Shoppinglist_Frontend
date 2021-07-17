import { useEffect, useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InsideGroup(props) {
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
        fetch('http://localhost:8080/groups/' + props.match.params.groupUrl)
            .then(r => r.json())
            .then(r => handleFetch(r))
    }, [])

    const handleFetch = (obj) => {
        setThisGroup(obj)
        console.log(obj)
    }

    

    return (
        <Container>
            <Row>
                <Col><h3>Group {thisGroup.groupName}</h3></Col>
            </Row>
            <Row>
                <h5>This group has {thisGroup.members.length} members</h5>
                {thisGroup.members.map((member) =>
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
                        <Card.Title>{item.itemName}</Card.Title>
                        <Card.Subtitle>Postet by {thisGroup.members.filter(person => person.id === item.personId).map(person => person.username)}</Card.Subtitle>
                        <Card.Text>{item.message}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}
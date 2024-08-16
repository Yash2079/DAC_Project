import React, {useContext} from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

const ProfilePage = () => {
    const { loggedIn, userId, userName, userEmail, userType, userEpoint} = useContext(UserContext);

    if (!loggedIn) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            <Card.Title>{userName}</Card.Title>
                            <Card.Text>
                            <strong>Email:</strong> {userId} <br />
                                <strong>Email:</strong> {userEmail} <br />
                                <strong>Epoints:</strong> {userEpoint} <br />
                                <strong>Membership:</strong> {userType > 0 ? 'Prime' : 'Regular' } <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;

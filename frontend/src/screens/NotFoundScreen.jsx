import { Container, Row, Col, Button} from 'react-bootstrap'
import { Link} from 'react-router-dom'

const NotFoundScreen = () => {
    return (
        <Container className='text-center mt-5'>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <div style={{fontSize: '8rem', color: '#dee2e6'}}>404</div>
                    <h1 className='mb-4'>Page Not Found</h1>
                    <p className='lead mb-4'>
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    <Button as={Link} to='/' variant='primary' size='lg'>
                        Go Back Home
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFoundScreen
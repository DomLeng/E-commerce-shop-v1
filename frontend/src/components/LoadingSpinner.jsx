import { Spinner, Container, Row, Col} from 'react-bootstrap'

const LoadingSpinner = ({message = 'Loading'}) => {

    return (
        <Container className='d-flex justify-content-center align-item-center' style={{ minHeight: '50vh'}}>
            <Row>
                <Col className='text-center'>
                <Spinner 
                    animation='border'
                    role='status'
                    style={{
                        width: '3rem',
                        height: '3rem',
                        margin: 'auto',
                        display: 'block'
                    }}
                />
                <p className='mt-3 text-muted'>{message}</p>
                </Col>
            </Row> 
        </Container>
    )
}

export default LoadingSpinner
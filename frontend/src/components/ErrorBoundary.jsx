import React from 'react'
import { Alert, Container} from 'react-bootstrap'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null}
    }

    static getDerivedStateFromError(error) {
        return { hasError: true}
    }

    componentDidCatch(error,errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render(){
        if (this.state.hasError) {
            return (
                <Container className='mt-5'>
                    <Alert variant='danger'>
                        <Alert.Heading>Oops! Something went wrong</Alert.Heading>
                        <p>
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <hr />
                        <details style={{ whiteSpace: 'pre-wrap'}}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    </Alert>
                </Container>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
import { Component } from 'react';
import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import menu from '../data/menu.json';

// per fare in modo che la lista rispecchi in ogni momento le recensioni dell'ultima pasta selezionata (cliccata) ho bisogno
// di inserire nel componente Home uno STATE
// lo STATE è una specie di "memoria" del componente
// lo STATE esiste solamente nei componenti CLASSE

class Home extends Component {
    // lo STATE può esistere solo in un componente classe
    // DEVE chiamarsi "state"
    // state è sempre un oggetto
    state = {
        selectedPasta: null // null è il valore iniziale di selectedPasta
    }
    // lo state si resetta aggiornando la pagina

    render() {
        return (
            <Container>
                <Row className='justify-content-center text-center'>
                    <Col xs={12} md={12}>
                        <h1>BENVENUTI</h1>
                        <h3>Niente secondi piatti qui!</h3>
                        <Carousel>

                        {
                            menu.map(pasta => {
                                return (
                                    <Carousel.Item 
                                    key={pasta.id}
                                    onClick={() => {
                                        console.log("click!")
                                        // lo state non è modificabile
                                        this.setState({
                                            selectedPasta: pasta
                                        })
                                    }}
                                    >
                                        <img
                                            className="d-block w-100"
                                            src={pasta.image}
                                            alt={pasta.description}
                                        />
                                        <Carousel.Caption>
                                            <h3>{pasta.name}</h3>
                                            <p>{pasta.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ) 
                            })
                        }
                        </Carousel>
                    </Col>
                </Row>
                <Row className="justify-contet-center">
                    <Col xs={12} md={12} className="text-center mt-3">
                    <ListGroup>
                        {
                            this.state.selectedPasta?.comments.map(review => (
                                <ListGroup.Item key={review.id}>
                                    {review.author} - {review.comment} 
                                </ListGroup.Item>
                            ))
                        }
                        
                    </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home
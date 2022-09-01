// ReservationList è un componente che recupererà dal server la lista delle prenotazioni
// e si occuperà di presentarle all'utente

import { Component } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
// Importa l'intera libreria anche se stiamo selezionando tre elementi

// import Container from 'react-bootstrap/Container';  !!!!!!DEGLI IMPORT COSI' SELETTIVI RENDERANNO PIU' LEGGERO NEL MOMENTO IN CUI LA DOVREMMO DEPLOYARE!!!!!!
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// recuperare una risorsa può richieedere del tempo, anche svariati secondi
// un'applicazione moderna presenta all'utente le parti statiche IMMEDIATAMENTE,
// mostrando un indicatore di caricamento per addolcire l'attesa del contenuto dinamico

// se il vostro componente necessita di recuperare una risorsa esterna,
// createlo come CLASSE

class ReservationList extends Component {

    state = {
        reservations: [],
        //inizializzare reservations come array vuoto è un'ottima scelta
        // in quanto rispecchia il tipo di dato che andremo a recuperare
        // e fa in modo che un eventuale .map() nel JSX semplicemente
        // non renderizzi alcun elemento dinamico
    }

    render() {
        return (
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={12} md={12}>
                        <h2 className='text-center my-4'>Attuali prenotazioni:</h2>
                        {/* qua inseriamo la lista dinamica */}
                        <ListGroup>

                            {
                                this.state.reservations.map((reservation) => {
                                    return (
                                        <ListGroup.Item key={reservation._id}>
                                            {reservation.name} per {reservation.numberOfPeople} -{' '}
                                            {reservation.dateTime}
                                        </ListGroup.Item>
                                    )
                                })
                            }
                            
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        
        )
    }
}

export default ReservationList;
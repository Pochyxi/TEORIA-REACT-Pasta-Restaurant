// ReservationList è un componente che recupererà dal server la lista delle prenotazioni
// e si occuperà di presentarle all'utente

import { Component } from 'react';
import { Container, Row, Col, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { parseISO, format} from 'date-fns';
// Importa l'intera libreria anche se stiamo selezionando tre elementi

// import Container from 'react-bootstrap/Container';  !!!!!!DEGLI IMPORT COSI' SELETTIVI RENDERANNO PIU' LEGGERO NEL MOMENTO IN CUI LA DOVREMMO DEPLOYARE!!!!!!
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// recuperare una risorsa può richieedere del tempo, anche svariati secondi
// un'applicazione moderna presenta all'utente le parti statiche IMMEDIATAMENTE,
// mostrando un indicatore di caricamento per addolcire l'attesa del contenuto dinamico

// se il vostro componente necessita di recuperare una risorsa esterna,
// createlo come CLASSE


//PASSAGGI IN CORSO
// 1) Lo stato viene inizializzato con un array reservations vuoto
// 2) render() viene invocato per la prima volta, essendo già collegato
//    allo stato ma non avendo elementi da mostrare al momento, renderizzerà
//    solamente la parti STATICHE dell'interfaccia (titolo, struttura di BS etc.)
// 3) Finito il primo render, parte (se presente) componentDidMount
// 4) componentDidMount esegue la funzione di fetch() e recupera i dati.
// Finito il recupero, i dati vengono inseriti nello stato con un seState
// 5) A causa del setState e del cambiamento di stato, render() viene invocato
//     una seconda volta: le parti statiche sono le stesse di prima
class ReservationList extends Component {

    state = {
        reservations: [],
        //inizializzare reservations come array vuoto è un'ottima scelta
        // in quanto rispecchia il tipo di dato che andremo a recuperare
        // e fa in modo che un eventuale .map() nel JSX semplicemente
        // non renderizzi alcun elemento dinamico
        loading: true,
        error: false,
    }

    // quindi quello che ci servirebbe sarebbe un modo per effettuare
    // il fetch delle prenotazioni immediatamente dopo la presentazione
    // delle parti STATICHE della pagina 
    // sarebbe fantastico trovare un modo per recuperare i dati
    // DOPO la prima invocazione di render()...

    componentDidMount = () => {
        // succede un istante dopo la fine del montaggio
        // del componente (ovvero la prima invocazione di render())
        console.log('sono componentDidMount');
        // componentDidMount accade UNA VOLTA SOLA

        // il fatto che componentDidMount venga eseguito una volta sola,
        // unito al fatto che viene eseguito in modo NON-BLOCCANTE
        // (dopo il render iniziale) lo rende PERFETTO per eseguire
        // operazioni di fetch() iniziali

        // invoco fetchReservations()
        this.fetchReservations();
    }

    fetchReservations = async () => {
        try {
           let response = await fetch(
               "https://striveschool-api.herokuapp.com/api/reservation",
               {
                   method: "GET",
                   headers: {
                       'content-type': 'application/json',
                       "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                   }
               }
               )
                if(response.ok){
                   let data = await response.json()
                   console.log(data)
                   // salvare nello state il nostro array data
                   setTimeout(() => {
                        this.setState(
                       {
                           reservations: data,
                           loading: false
                        }
                    );
                   }, 1000)
                   
                } else {
                    this.setState({loading: false, error: true});
                }
        } catch (error) {
            console.error(error);
            this.setState({error: true});
        }
    }

    render() {
        console.log('sono render');
        return (
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={12} md={12}>
                        <h2 className='text-center my-4'>Attuali prenotazioni:</h2>
                        {/* qua inseriamo la lista dinamica */}
                        <ListGroup>
                            <div className='d-flex justify-content-center my-4'>
                                {this.state.error && (
                                    <Alert variant='danger'>
                                    Errore nel recupero delle informazioni!
                                  </Alert>
                                )}
                                {this.state.loading && ( // short-circuit operator
                                    <Spinner animation="border" variant="success" />
                                )}                               
                            </div>
                            <ListGroup>
                                {this.state.reservations.length === 0 &&
                                !this.state.loading &&
                                !this.state.error && (
                                    <ListGroup.Item>
                                        Non esistono al momento prenotazioni
                                    </ListGroup.Item>
                                )

                                }
                            </ListGroup>
                            {
                                this.state.reservations.map((reservation) => {
                                    return (
                                        <ListGroup.Item key={reservation._id}>
                                            {reservation.name} per {reservation.numberOfPeople} -{' '}
                                            {/* voglio transformare la proprietà dateTime della
                                            prenotazione in qualcosa di più leggibile */}
                                            {/* useremo date-fns, servono due passaggi:
                                            1) Trasformare la stringa ateTime in un oggetto Date
                                            2) formattare questo oggetto Date in un qualcosa di più leggibile */}
                                            {format(parseISO(reservation.dateTime),
                                             'dd MMMM yyyy - HH:mm')}
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
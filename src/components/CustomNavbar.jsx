import { Navbar, Nav } from "react-bootstrap";

// se si hanno più props allora accediamo alle props con props.brand
// se la props è unica possiamo richiamare la proprietà con { brand }
const CustomNavbar = ({ brand }) => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Pasta Restaurant - {brand}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#deets">Menu</Nav.Link>
              <Nav.Link href="#memes">
                Prenotazioni
              </Nav.Link>
              <Nav.Link href="#contattil"> Contatti </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
)

export default CustomNavbar;

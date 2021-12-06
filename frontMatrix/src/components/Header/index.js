import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function Header(props) {
  const { setRoute } = props;
  const profile = useSelector(state => state.user.profile);

  return (
    <Navbar bg="primary" expand="lg">
      <Container >
        <Navbar.Brand href="/">Teste-Mtrix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Perfil</Nav.Link>
            <NavDropdown title="Actions" id="basic-nav-dropdown">
              <NavDropdown.Item onClick = {() => setRoute("cadastro")}>Cadastrar Produto</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => setRoute("sugestoes")}>Sugestoes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Text>
            Usuario: {profile.email}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

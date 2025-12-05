/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: yahya osman Student ID: 179264239 Date: 04/11/2025
*
* Vercel App (Deployed) Link: "https://web422-user-api-ashy.vercel.app/api/user"
*                             "https://web422-assignment3-six.vercel.app/login"
*
********************************************************************************/

import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        
        <Navbar.Brand as={Link} href="/">
          Student Name
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          
          {token && (
            <Nav>
              <NavDropdown
                title={token.userName}
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          
          {!token && (
            <Nav>
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}





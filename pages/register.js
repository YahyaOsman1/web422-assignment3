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
*
********************************************************************************/

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning('');

    try {
      await registerUser(user, password, password2);
      router.push('/login'); 
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <PageHeader text="Register" subtext="Register for an account:" />
      <Card bg="light">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>User:</Form.Label>
              <Form.Control
                type="text"
                id="userName"
                name="userName"
                value={user}
                onChange={e => setUser(e.target.value)}
              />
            </Form.Group>

            <br />

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <br />

            <Form.Group>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </Form.Group>

            <br />

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

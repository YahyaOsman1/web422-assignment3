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

import { useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import PageHeader from '@/components/PageHeader'
import { authenticateUser } from '@/lib/authenticate'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { getFavourites } from '@/lib/userData'

export default function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')
  const router = useRouter()
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

  async function updateAtom() {
    setFavouritesList(await getFavourites())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setWarning('')

    try {
      await authenticateUser(user, password)
      await updateAtom()
      router.push('/')
    } catch (err) {
      setWarning(err.message)
    }
  }

  return (
    <>
      <PageHeader text="Login" subtext="Enter your login information below:" />
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

            <Button variant="primary" type="submit">
              Login
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
  )
}

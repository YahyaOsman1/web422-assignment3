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


import { Container } from 'react-bootstrap'
import MainNav from './MainNav'

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <div style={{ height: 48 }} /> {}
      <Container className="pt-3">{children}</Container>
    </>
  )
}

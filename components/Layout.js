/********************************************************************************
* WEB422 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Yahya Osman Student ID: 179264239 Date: 11/11/2025
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

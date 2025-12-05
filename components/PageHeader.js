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

import { Container } from "react-bootstrap"

export default function PageHeader({ text, subtext, subText }) {
  const subtitle = subtext ?? subText

  return (
    <div className="py-5 bg-light rounded mb-4 text-center">
      <Container>
        <h1 className="display-5 fw- text-primary mb-3">{text}</h1>
        {subtitle && (
          <p className="lead text-muted m-0">{subtitle}</p>
        )}
      </Container>
    </div>
  )
}



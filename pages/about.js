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

import { Card } from "react-bootstrap"
import PageHeader from "../components/PageHeader"
import BookDetails from "../components/BookDetails"

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL453657W.json")
  const data = await res.json()
  return { props: { book: data } }
}

export default function About({ book }) {
  return (
    <div>
      <PageHeader 
        text="About the Developer"
        subtext={"Yahya osman"}
      />

      <Card className="border-0">
        <Card.Body>
          <p>
            Hello! I&apos;m Yahya Osman, a video game developer. Graduated from Toronto Film School 2023 and I&apos;m currently a student at Seneca College. I study computer programming and analysis. I enjoy creating web applications. I&apos;m more specialized in video game development and animation.
          </p>
          <p>
            For this project, the book featured is &quot;The Colour of Magic&quot; published 1983 by the author &quot;Terry Pratchett&quot;.
          </p>
        </Card.Body>
      </Card>

      <BookDetails book={book} />
    </div>
  )
}

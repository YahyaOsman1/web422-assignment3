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

import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import PageHeader from '@/components/PageHeader'
import BookCard from '@/components/BookCard'
import { getFavourites } from '@/lib/userData'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavourites() {
      const favs = await getFavourites()
      if (Array.isArray(favs)) {
        setFavouritesList(favs)
      }
      setLoading(false)
    }
    loadFavourites()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <PageHeader text="Loading..." />
      </div>
    )
  }

  if (!favouritesList.length) {
    return (
      <div className="container">
        <PageHeader text="Nothing Here" subtext="Try adding a book to the list" />
      </div>
    )
  }

  return (
    <div className="container">
      <PageHeader text="Favourites" subtext="All your favourite books, in one place" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

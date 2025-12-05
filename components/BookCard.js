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

import useSWR from 'swr'
import Error from 'next/error'
import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { addToFavourites, removeFromFavourites } from '@/lib/userData'
import { useMemo, useState } from 'react'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  )

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const isFavourite = useMemo(() => favouritesList.includes(workId), [favouritesList, workId])
  const [added, setAdded] = useState(isFavourite)

  async function toggleFavourite() {
    if (added) {
      const updated = await removeFromFavourites(workId)
      setFavouritesList(updated)
      setAdded(false)
    } else {
      const updated = await addToFavourites(workId)
      setFavouritesList(updated)
      setAdded(true)
    }
  }

  if (error || !data) return <Error statusCode={404} />

  const coverId = data?.covers?.[0]
  const src = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null

  return (
    <Card className="h-100 d-flex flex-column">
      {src && (
        <Card.Img
          variant="top"
          className="img-fluid"
          src={src}
          alt={data.title || 'Book cover'}
          onError={(e) => {
            e.currentTarget.src = '/next.svg'
          }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{data.title || ''}</Card.Title>

        <Card.Text className="mb-3">
          <strong>Published:</strong> {data.first_publish_date || 'N/A'}
        </Card.Text>

        <div className="d-flex flex-column mt-auto gap-2">
          <Button as={Link} href={`/works/${workId}`} variant="primary">
            View Book
          </Button>

          <Button
            variant={added ? 'primary' : 'outline-primary'}
            onClick={toggleFavourite}
          >
            {added ? '+ Favourite (added)' : '+ Favourite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

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

import Link from 'next/link'
import { Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { addToFavourites, removeFromFavourites } from '@/lib/userData'

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [showAdded, setShowAdded] = useState(false)

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId))
  }, [favouritesList, workId])

  async function favouritesClicked() {
    if (showAdded) {
      const updated = await removeFromFavourites(workId)
      setFavouritesList(updated)
      setShowAdded(false)
    } else {
      const updated = await addToFavourites(workId)
      setFavouritesList(updated)
      setShowAdded(true)
    }
  }

  const coverId = book?.covers?.[0]
  const coverSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : '/next.svg'

  const description =
    (typeof book?.description === 'string'
      ? book.description
      : book?.description?.value) || ''

  return (
    <Row className="gy-4">
      <Col lg="4" md="5">
        <img
          className="img-fluid d-block"
          src={coverSrc}
          alt={book?.title || 'Book cover'}
          onError={(e) => {
            e.currentTarget.src = '/next.svg'
          }}
        />
      </Col>

      <Col lg="8" md="7">
        <h3 className="mb-3">{book?.title || ''}</h3>
        {description && <p className="mb-4">{description}</p>}

        {book?.subjects?.length ? (
          <>
            <h5 className="text-primary">Characters</h5>
            <p>{(book?.characters || []).join(', ')}</p>
          </>
        ) : null}

        {book?.places?.length || book?.subject_places?.length ? (
          <>
            <h5 className="text-primary">Settings</h5>
            <p>
              {[...(book?.subject_places || []), ...(book?.places || [])].join(
                ', '
              )}
            </p>
          </>
        ) : null}

        <h5 className="text-primary">More Information</h5>
        <div className="d-flex flex-column gap-1 mb-3">
          {book?.links?.map((l, i) => (
            <Link key={i} href={l?.url || '#'} target="_blank">
              {l?.title || l?.url}
            </Link>
          ))}

          {!book?.links?.length && (
            <>
              <Link
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                  book?.title || ''
                )}`}
                target="_blank"
              >
                Wikipedia
              </Link>
              <Link
                href={`https://www.goodreads.com/search?q=${encodeURIComponent(
                  book?.title || ''
                )}`}
                target="_blank"
              >
                Goodreads
              </Link>
            </>
          )}
        </div>

        {showFavouriteBtn && workId && (
          <Button
            variant={showAdded ? 'primary' : 'outline-primary'}
            onClick={favouritesClicked}
          >
            {showAdded ? '+ Favourite (added)' : '+ Favourite'}
          </Button>
        )}
      </Col>
    </Row>
  )
}


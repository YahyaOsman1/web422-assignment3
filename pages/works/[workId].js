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

import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from 'next/error'
import PageHeader from '../../components/PageHeader'
import BookDetails from '../../components/BookDetails'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function WorkDetails() {
  const router = useRouter()
  const workId = router.query.workId

  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  )

  if (error) return <Error statusCode={404} />
  if (!data) return <div className="container">Loading…</div>

  return (
    <div className="container">
      <PageHeader text={data.title || 'Work'} />
      {/* pass workId so the Favourite button works */}
      <BookDetails book={data} workId={workId} />
    </div>
  )
}



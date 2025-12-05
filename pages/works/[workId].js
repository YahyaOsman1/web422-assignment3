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



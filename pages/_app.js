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

import '@/styles/bootstrap.min.css'
import '@/styles/globals.css'
import Layout from '@/components/Layout'
import RouteGuard from '@/components/RouteGuard'
import { SWRConfig } from 'swr'

const fetcher = async (...args) => {
  const res = await fetch(...args)
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  return res.json()
}

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  )
}



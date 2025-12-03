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



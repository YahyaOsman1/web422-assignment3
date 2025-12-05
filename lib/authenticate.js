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

import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'access_token'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://web422-user-api-ashy.vercel.app/api/user'

function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch (err) {}
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (err) {
    return null
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (err) {}
}

export function readToken() {
  try {
    const token = getToken()
    return token ? jwtDecode(token) : null
  } catch (err) {
    return null
  }
}

export function isAuthenticated() {
  const token = readToken()
  return token ? true : false
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password }),
    headers: { 'Content-Type': 'application/json' }
  })

  let data = null
  try {
    data = await res.json()
  } catch {}

  if (res.status === 200 && data && data.token) {
    setToken(data.token)
    return true
  } else {
    const message = (data && data.message) || 'Unable to login.'
    throw new Error(message)
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password, password2 }),
    headers: { 'Content-Type': 'application/json' }
  })

  let data = null
  try {
    data = await res.json()
  } catch {}

  if (res.status === 200) {
    return true
  } else {
    const message = (data && data.message) || 'Unable to register.'
    throw new Error(message)
  }
}
